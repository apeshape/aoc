import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(" ").map(Number));

const getSequence = (line, acc) => {
  if (line.every((x) => x === 0)) return acc;
  const diffs = line.reduce((a, c, idx, arr) => {
    const prev = arr[idx - 1];
    if (prev === undefined) return a;
    a.push(c - prev);
    return a;
  }, []);
  return getSequence(diffs, [...acc, diffs]);
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const getPrediction = (sequence) => {
    sequence.reverse().forEach((s, idx) => {
      const prev = sequence[idx - 1];
      if (prev === undefined) {
        s.push(0);
      } else {
        s.push(Number(s.slice(-1)) + Number(prev.slice(-1)));
      }
    });
    return sequence;
  };

  return input.reduce((acc, curr) => {
    const predicted = getPrediction(getSequence(curr, [curr]));
    acc += Number(predicted.slice(-1)[0].slice(-1));
    return acc;
  }, 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const getPrevious = (seq) => {
    seq.reverse().forEach((currLine, idx) => {
      const prevLine = seq[idx - 1];
      if (!prevLine) {
        seq[idx] = [0, ...seq[idx]];
      } else {
        const curr = currLine[0];
        seq[idx] = [curr - prevLine[0], ...seq[idx]];
      }
    });
    return seq;
  };

  return input.reduce((acc, curr) => {
    const withPrev = getPrevious(getSequence(curr, [curr]));
    acc += Number(withPrev.slice(-1)[0][0]);
    return acc;
  }, 0);
};
const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
