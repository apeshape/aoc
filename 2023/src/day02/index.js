import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) =>
    line
      .split(": ")[1]
      .split(/; |, /)
      .map((d) => d.split(" ")),
  );

const test = {
  red: 12,
  green: 13,
  blue: 14,
};

const getBag = (game) =>
  game.reduce((a, [count, color]) => {
    if (!a[color]) a[color] = Number(count);
    if (Number(count) > a[color]) a[color] = Number(count);
    return a;
  }, {});
const part1 = (rawInput) =>
  parseInput(rawInput).reduce(
    (a, g, i) =>
      Object.entries(test).every(([k, v]) => getBag(g)[k] <= v) ? a + i + 1 : a,
    0,
  );

const part2 = (rawInput) =>
  parseInput(rawInput).reduce(
    (acc, curr) => acc + Object.values(getBag(curr)).reduce((a, c) => a * c),
    0,
  );

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
