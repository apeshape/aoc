import run from "aocrunner";
import { zip } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput;

const getOrderedLists = (input: string): Array<number[]> => {
  const parsedInput = input.split("\n").map((l) => {
    const m = l.match(/(\d+)\s+(\d+)/);
    return [Number(m?.[1]), Number(m?.[2])];
  });
  return [
    parsedInput.map((l) => l[0]).sort(),
    parsedInput.map((l) => l[1]).sort(),
  ];
};

const part1 = (rawInput: string) => {
  const orderedLists = getOrderedLists(parseInput(rawInput));
  return zip(orderedLists[0], orderedLists[1]).reduce(
    (acc: number, line: number[]) => acc + Math.abs(line[0] - line[1]),
    0,
  );
};

const part2 = (rawInput: string) => {
  const orderedLists = getOrderedLists(parseInput(rawInput));
  return orderedLists[0].reduce(
    (acc, cur) => acc + cur * orderedLists[1].filter((x) => x === cur).length,
    0,
  );
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
