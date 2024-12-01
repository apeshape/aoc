import run from "aocrunner";
import { intersects } from "../utils/index.js";

const parseInput = (rawInput) => rawInput.split("\n");

const alph = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const getPriority = (item) => {
  return alph.indexOf(item) + 1;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const total = input.reduce(
    (acc, cur) =>
      acc +
      getPriority(
        intersects(
          new Set(cur.slice(0, cur.length / 2).split("")),
          new Set(cur.slice(cur.length / 2).split("")),
        )[0],
      ),
    0,
  );
  return total;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const groups = [];
  let newGroup = [];
  input.forEach((l, idx) => {
    newGroup.push(l);
    if (idx % 3 === 2) {
      groups.push(newGroup);
      newGroup = [];
    }
  });
  let total = 0;
  groups.forEach((group) => {
    const sets = [];
    group.forEach((e) => sets.push(new Set(e.split(""))));
    const badge = intersects(new Set(intersects(sets[0], sets[1])), sets[2])[0];

    total += getPriority(badge);
  });
  return total;
};

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
