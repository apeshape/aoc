import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map(Number);

const calculateMass = (n: number) => Math.floor(n / 3) - 2;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.reduce((a, n) => a + calculateMass(n), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const getFuel = (mass: number, total = 0) => {
    const newMass = calculateMass(mass);
    if (newMass <= 0) return total;
    return getFuel(newMass, total + newMass);
  };
  return input.reduce((a, c) => a + getFuel(c), 0);
};

run({
  part1: {
    tests: [
      {
        input: `100756
1969`,
        expected: 654 + 33583,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `100756`,
        expected: 50346,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
