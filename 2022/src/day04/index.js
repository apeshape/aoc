import run from "aocrunner";
import { inRange } from "../utils/index.js";

const parseInput = (rawInput) => rawInput.split("\n");
const part1 = (rawInput) => {
  const pairs = parseInput(rawInput);
  const total = pairs
    .map((pair) => pair.split(","))
    .reduce((acc, [e1, e2]) => {
      const zones1 = e1.split("-").map(Number);
      const zones2 = e2.split("-").map(Number);
      return (zones1[0] >= zones2[0] && zones1[1] <= zones2[1]) ||
        (zones2[0] >= zones1[0] && zones2[1] <= zones1[1])
        ? acc + 1
        : acc;
    }, 0);
  return total;
};

const part2 = (rawInput) => {
  const pairs = parseInput(rawInput);
  const total = pairs
    .map((pair) => pair.split(","))
    .reduce((acc, [e1, e2]) => {
      const zones1 = e1.split("-").map(Number);
      const zones2 = e2.split("-").map(Number);
      const z1within2 =
        inRange(zones1[1], zones2[0], zones2[1]) ||
        inRange(zones1[0], zones2[0], zones2[1]);
      const z2within1 =
        inRange(zones2[0], zones1[0], zones1[1]) ||
        inRange(zones2[1], zones1[0], zones1[1]);
      const isWithin = z1within2 || z2within1;
      return isWithin ? acc + 1 : acc;
    }, 0);
  return total;
};

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
