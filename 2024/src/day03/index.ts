import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return [...input.matchAll(/(mul\(\d{1,3},\d{1,3}\))/g)]
    .map((x) => x[0])
    .reduce((acc, cur) => {
      const digits = cur.match(/(\d{1,3}),(\d{1,3})/);
      return acc + Number(digits![1]) * Number(digits![2]);
    }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const instructions = [
    ...input.matchAll(/(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don\'t\(\))/g),
  ].map((x) => x[0]);

  let enabled = true;
  const total = instructions.reduce((acc, instr) => {
    if (instr === "do()") enabled = true;
    if (instr === "don't()") enabled = false;
    if (enabled) {
      const digits = instr.match(/(\d{1,3}),(\d{1,3})/);
      if (digits) return acc + Number(digits[1]) * Number(digits[2]);
    }
    return acc;
  }, 0);

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
