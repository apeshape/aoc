import run from "aocrunner";
import { intcode } from "../utils/intcode.js";
import { clone } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput.split(",").map(Number);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  input[1] = 12;
  input[2] = 2;
  const result = intcode(input);
  return result[0];
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let result = 0;
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      const program = clone(input);
      program[1] = i;
      program[2] = j;
      const output = intcode(program);
      if (output[0] === 19690720) {
        console.log("found", i, j);
        result = i * 100 + j;
        break;
      }
    }
  }
  return result;
};

run({
  part1: {
    tests: [],
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
