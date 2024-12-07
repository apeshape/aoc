import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((l) => [
      Number(l.split(": ")[0]),
      l.split(": ")[1].split(" ").map(Number),
    ]) as Array<[number, number[]]>;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const test = (
    numbers: number[],
    target: number,
    total = 0,
    valid = false,
  ): boolean => {
    if (numbers.length === 0 && total === target) {
      valid = true;
    }
    const current = numbers.shift();
    if (current) {
      valid = test([...numbers], target, total + current, valid);
      if (valid) return valid;
      valid = test([...numbers], target, total * current, valid);
      if (valid) return valid;
    }
    return valid;
  };

  const valids = input.filter((inp) => {
    return test(inp[1], inp[0]);
  });

  return valids.reduce((acc, cur) => acc + cur[0], 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const test = (
    numbers: number[],
    target: number,
    total = 0,
    valid = false,
  ): boolean => {
    if (numbers.length === 0 && total === target) {
      valid = true;
    }
    const current = numbers.shift();
    if (current) {
      valid = test([...numbers], target, total + current, valid);
      if (valid) return valid;
      valid = test([...numbers], target, total * current, valid);
      if (valid) return valid;
      valid = test([...numbers], target, Number(`${total}${current}`), valid);
      if (valid) return valid;
    }
    return valid;
  };

  const valids = input.filter((inp) => {
    return test(inp[1], inp[0]);
  });

  return valids.reduce((acc, cur) => acc + cur[0], 0);
};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11378,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
