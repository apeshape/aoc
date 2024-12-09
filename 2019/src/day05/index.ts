import run from "aocrunner";
import { intcode } from "../utils/intcode.js";

const parseInput = (rawInput: string) => rawInput.split(",").map(Number);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const output = intcode(input, 1);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: `1002,4,3,4,33`,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
