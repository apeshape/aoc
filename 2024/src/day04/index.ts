import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split(""));

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput);
  const dirs = [
    //[y, x]
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];

  const testPos = (x: number, y: number) => {
    const found = [];
    dirs.forEach((dir) => {
      let str = "";
      let curPos = [x, y];
      while (str.length < 4) {
        if (grid[curPos[1]]?.[curPos[0]]) {
          str += grid[curPos[1]][curPos[0]];
          curPos = [curPos[0] + dir[1], curPos[1] + dir[0]];
        } else {
          break;
        }
      }
      if (str === "XMAS" || str === "SAMX") {
        found.push(str);
      }
    });
    return found.length;
  };

  let score = 0;
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const char = grid[y][x];
      if (char === "X") {
        score += testPos(x, y);
      }
    }
  }

  return score;
};

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput);

  const testPos = (x: number, y: number) => {
    const maxX = x + 2;
    const maxY = y + 2;
    if (grid[maxY]?.[maxX] === undefined) {
      return 0;
    }

    const topLeft = grid[y][x];
    const topRight = grid[y][x + 2];
    const bottomRight = grid[y + 2][x + 2];
    const bottomLeft = grid[y + 2][x];
    const middle = grid[y + 1][x + 1];
    const first = [topLeft, middle, bottomRight].join("");
    const second = [topRight, middle, bottomLeft].join("");

    if (
      (first === "MAS" || first === "SAM") &&
      (second === "MAS" || second === "SAM")
    ) {
      return 1;
    }

    return 0;
  };

  let score = 0;
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const char = grid[y][x];
      if (["M", "S"].includes(char)) {
        score += testPos(x, y);
      }
    }
  }

  return score;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
