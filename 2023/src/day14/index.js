import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((l) => l.split(""));

const directions = {
  n: [-1, 0],
  w: [0, -1],
  s: [-1, 0],
  e: [0, -1],
};

const tiltBoard = (board, dir) => {
  if (dir === directions.s) {
    board.reverse();
  }
  if (dir === directions.e) {
    board.forEach((row) => {
      row.reverse();
    });
  }
  board.forEach((row, idx) => {
    row.forEach((_rock, jdx) => {
      let i = idx + dir[0];
      let j = jdx + dir[1];
      if (_rock === "O") {
        // console.log("ROLLING ROCK AT", idx, jdx);
        while (board[i]?.[j]) {
          const nextRock = board[i][j];
          if (nextRock !== ".") {
            break;
          }
          i += dir[0];
          j += dir[1];
        }
        const newY = i + dir[0] * -1;
        const newX = j + dir[1] * -1;
        board[idx][jdx] = ".";
        board[newY][newX] = "O";
      }
    });
  });
  if (dir === directions.s) {
    board.reverse();
  }
  if (dir === directions.e) {
    board.forEach((row) => {
      row.reverse();
    });
  }

  return board;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const tiltedBoard = tiltBoard([...input], directions.n);
  let score = 0;
  tiltedBoard.forEach((row, idx) => {
    row.forEach((rock) => {
      if (rock === "O") {
        score += tiltedBoard.length - idx;
      }
    });
  });

  return score;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  // input.forEach((l) => console.log(l.join("")));

  const cycles = 1_000_000_000;

  const doCycle = (board) => {
    const tbn = tiltBoard([...board], directions.n);
    const tbw = tiltBoard([...tbn], directions.w);
    const tbs = tiltBoard([...tbw], directions.s);
    const tbe = tiltBoard([...tbs], directions.e);
    return tbe;
  };

  const numCycles = 3;
  let i = 0;
  let board = [...input];

  while (i < numCycles) {
    board = doCycle(board);
    i++;
  }

  // console.log(`==== AFTER ${numCycles} CYCLES ====`);
  // board.forEach((l) => console.log(l.join("")));

  let score = 0;
  board.forEach((row, idx) => {
    row.forEach((rock) => {
      if (rock === "O") {
        score += board.length - idx;
      }
    });
  });

  return score;
};

const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;
run({
  part1: {
    tests: [
      // {
      //   input,
      //   expected: 136,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
