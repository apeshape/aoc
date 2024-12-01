import run from "aocrunner";
import { sumList } from "../utils/index.js";

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((e) => e.split("\n").map(Number));

const getSortedSumList = (input) => {
  return input.map(sumList).sort((a, b) => b - a);
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const summedElves = getSortedSumList(input);
  return summedElves[0];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const summedElves = getSortedSumList(input);
  return sumList(summedElves.slice(0, 3));
};

const testInput = `1000
                  2000
                  3000

                  4000

                  5000
                  6000

                  7000
                  8000
                  9000

                  10000`;
run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 24000,
      },
      {
        input: `
          1000

          2000

          3000
          5000
        `,
        expected: 8000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
