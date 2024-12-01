import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const scores = {
    X: 1, // ROCK
    Y: 2, // PAPER
    Z: 3, // SCISSORS
  };
  const rounds = parseInput(rawInput);
  const rules = {
    ["A X,B Y,C Z"]: 3, // DRAW
    ["A Z,B X,C Y"]: 0, // LOSE
    ["A Y,B Z,C X"]: 6, // WIN
  };
  return rounds.reduce(
    (acc, round) =>
      acc +
      Object.entries(rules).find(([rule]) => rule.includes(round))[1] +
      scores[round[2]],
    0,
  );
};

const part2 = (rawInput) => {
  const scores = {
    A: 1, // ROCK
    B: 2, // PAPER
    C: 3, // SCISSORS
  };
  const win = {
    A: scores.B,
    B: scores.C,
    C: scores.A,
  };
  const lose = {
    A: scores.C,
    B: scores.A,
    C: scores.B,
  };
  const rounds = parseInput(rawInput);
  let total = 0;
  const playRound = (op, strat) => {
    if (strat === "X") {
      //Lose
      total += lose[op];
    }
    if (strat === "Y") {
      //DRAW
      total += scores[op] + 3;
    }
    if (strat === "Z") {
      //WIN
      total += win[op] + 6;
    }
  };
  rounds.forEach((round) => {
    const [op, strat] = round.split(" ");
    playRound(op, strat);
  });

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `
A Y
B X
C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
A Y
B X
C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
