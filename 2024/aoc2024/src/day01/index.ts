import run from "aocrunner";
import { zip } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput;

const getOrderedLists = (input: string): Array<number[]> => {
  const parsedInput = input.split("\n").map((l) => {
    const m = l.match(/(\d+)\s+(\d+)/);
    return [Number(m?.[1]), Number(m?.[2])];
  });

  const left = parsedInput.map((l) => l[0]).sort();
  const right = parsedInput.map((l) => l[1]).sort();

  return [left, right];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const orderedLists = getOrderedLists(input);
  return zip(orderedLists[0], orderedLists[1]).reduce(
    (acc: number, line: number[]) => {
      const [l, r] = line;
      return acc + Math.abs(l - r);
    },
    0,
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const orderedLists = getOrderedLists(input);

  const ans = orderedLists[0].reduce(
    (acc, cur) => acc + cur * orderedLists[1].filter((x) => x === cur).length,
    0,
  );

  return ans;
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
