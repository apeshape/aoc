import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split(" ").map(Number));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const isSafe = (report: number[]) => {
    if (report[0] > report[report.length - 1]) {
      report.reverse();
    }
    for (var i = 0; i < report.length; i++) {
      const curr = report[i];
      const next = report[i + 1];
      if (next && (next - curr > 3 || next - curr < 1)) return false;
    }
    return true;
  };

  return input.map(isSafe).filter(Boolean).length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const testRemove = (report: number[]) => {
    for (var i = 0; i < report.length; i++) {
      const newReport = [...report.slice(0, i), ...report.slice(i + 1)];
      if (isSafe(newReport, true)) return true;
    }
    return false;
  };

  const isSafe = (report: number[], removed = false) => {
    if (report[0] > report[report.length - 1]) {
      report.reverse();
    }
    for (var i = 0; i < report.length; i++) {
      const [curr, next] = [report[i], report[i + 1]];
      if (next && (next - curr > 3 || next - curr < 1))
        return removed ? false : testRemove(report);
    }
    return true;
  };

  return input.map((el) => isSafe(el)).filter(Boolean).length;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
