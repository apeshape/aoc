import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n\n");

const Monkey = (items, op, test, targets) => {
  let inspects = 0;
  const doThrow = (item) => {
    inspects += 1;
    const lvl = op(item);
    const newLvl = Math.floor(lvl / 3);
    const target = test(newLvl) ? targets[0] : targets[1];
    return [target, newLvl];
  };
  const getInspects = () => inspects;

  return {
    doThrow,
    items,
    getInspects,
  };
};

const ops = {
  "*": (factor) => (old) => factor === "old" ? old * old : old * factor,
  "+": (factor) => (old) => factor === "old" ? old * old : old + factor,
};

const makeMonkey = (monkeyInput) => {
  const parts = monkeyInput.split("\n");
  const [m, itemsInp, opInp, testInp, ifTrueInp, ifFalseInp] = parts.map(
    (p) => p.split(": ")[1],
  );
  const startingItems = itemsInp.split(", ").map(Number);

  const opType = opInp.match(/([\*|\+])/)[0];
  const _opFactor = opInp.split(`${opType} `)[1];
  const opFactor = _opFactor === "old" ? "old" : Number(_opFactor);
  const op = ops[opType](opFactor);

  const testNumber = Number(testInp.split("by ")[1]);
  const test = (n) => n % testNumber === 0;
  const targets = [
    Number(ifTrueInp.split("monkey ")[1]),
    Number(ifFalseInp.split("monkey ")[1]),
  ];

  const monkey = Monkey(startingItems, op, test, targets, opFactor);
  return monkey;
};
const doRound = (monkeys) => {
  monkeys.forEach((monkey) => {
    let item = monkey.items.pop();
    while (item) {
      const [target, newLvl] = monkey.doThrow(item);
      // console.log(
      //   `throw item of lvl ${item} to monkey ${target} with new lvl: ${newLvl}`,
      // );
      monkeys[target].items.push(newLvl);
      item = monkey.items.pop();
    }
  });
};
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const monkeys = input.map(makeMonkey);

  let rounds = 20;
  while (rounds--) {
    doRound(monkeys);
  }
  const activity = monkeys.map((m) => m.getInspects()).sort((a, b) => b - a);

  return activity[0] * activity[1];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const monkeys = input.map(makeMonkey);

  let rounds = 20;
  while (rounds--) {
    doRound(monkeys);
  }
  const activity = monkeys
    .map((m, i) => {
      console.log(`Monkey ${i} inspected ${m.getInspects()} times`);
      return m.getInspects();
    })
    .sort((a, b) => b - a);
  console.log(activity);

  return;
};

const monkeys = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

run({
  part1: {
    tests: [
      {
        input: monkeys,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: monkeys,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
