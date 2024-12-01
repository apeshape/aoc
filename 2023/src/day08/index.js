import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n\n");

const getNodes = (nodeList) => {
  return nodeList.split("\n").reduce((a, c) => {
    const [node, lr] = c.split(" = ");
    const dests = lr.slice(1).slice(0, -1).split(", ");
    a[node] = {
      L: dests[0],
      R: dests[1],
    };
    return a;
  }, {});
};

const part1 = (rawInput) => {
  const [steps, nodeList] = parseInput(rawInput);

  const stepList = steps.split("");

  const nodes = getNodes(nodeList);

  let current = "AAA";
  let i = 0;

  while (current !== "ZZZ") {
    const s = i % stepList.length;
    const dir = stepList[s];
    current = nodes[current][dir];
    i++;
  }

  return i;
};

const part2 = (rawInput) => {
  const [steps, nodeList] = parseInput(rawInput);
  const stepList = steps.split("");
  const nodes = getNodes(nodeList);
  const startingNodes = Object.keys(nodes).filter((k) => k.endsWith("A"));

  const isEnd = (nds) => nds.every((x) => x.endsWith("Z"));

  let currentNodes = [...startingNodes.slice(0, 4)];
  let i = 0;
  console.log(currentNodes);
  const takeStep = () => {
    const s = i % stepList.length;
    const dir = stepList[s];
    currentNodes = currentNodes.map((n) => {
      return nodes[n][dir];
    });
    i++;
  };

  while (!isEnd(currentNodes)) {
    takeStep();
  }
  console.log(i);

  return i;
};

const input = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const input2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 2,
      },
      {
        input: `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
      // {
      //   input2,
      //   expected: 6,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: input2,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
