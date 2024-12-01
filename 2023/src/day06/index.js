import run from "aocrunner";

const zip = (a, b) => a.map((e, i) => [e, b[i]]);

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((row) => row.split(/\s+/).slice(1).filter(Boolean).map(Number));

const getTimes = ([time, dist]) => {
  let pushFor = 0;
  const records = [];
  while (pushFor < time) {
    const timeLeft = time - pushFor;
    const myDist = pushFor * timeLeft;
    if (myDist > dist) {
      records.push(myDist);
    }
    pushFor++;
  }
  return records;
};
const part1 = (rawInput) => {
  const [times, distances] = parseInput(rawInput);
  const races = zip(times, distances);
  return races.reduce((acc, race) => (acc *= getTimes(race).length), 1);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const race = input.map((row) => row.join("")).map(Number);
  return getTimes(race).length;
};

const input = `Time:      7  15   30
Distance:  9  40  200`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
