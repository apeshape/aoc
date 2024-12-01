import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((row) => row.split("").map(Number));

const directions = [
  [0, -1], // up
  [-1, 0], // left
  [1, 0], // down
  [0, 1], // right
];
const part1 = (rawInput) => {
  const grid = parseInput(rawInput);

  let numVisible = 0;
  grid.forEach((row, yi) => {
    row.forEach((tree, xi) => {
      const visible = directions
        .map(([xdir, ydir]) => {
          let xpos = xi + xdir;
          let ypos = yi + ydir;
          const treesInDir = [];
          while (grid[ypos]?.[xpos] !== undefined) {
            treesInDir.push(grid[ypos][xpos]);
            xpos += xdir;
            ypos += ydir;
          }
          return treesInDir.every((t) => t < tree);
        })
        .some((el) => el);

      if (visible) {
        numVisible += 1;
      }
    });
  });
  return numVisible;
};

const getDir = ([xdir, ydir]) => {
  if (xdir === -1) return "left";
  if (xdir === 1) return "right";
  if (ydir === 1) return "down";
  if (ydir === -1) return "up";
};

const part2 = (rawInput) => {
  const grid = parseInput(rawInput);
  let allScores = [];
  grid.forEach((row, yi) => {
    row.forEach((tree, xi) => {
      const viewingScores = directions.map(([xdir, ydir]) => {
        let xpos = xi + xdir;
        let ypos = yi + ydir;
        let score = 0;
        let higherFound = false;
        while (grid[ypos]?.[xpos] !== undefined && !higherFound) {
          if (grid[ypos][xpos] >= tree) {
            higherFound = true;
          }
          score += 1;
          xpos += xdir;
          ypos += ydir;
        }
        return score;
      });
      allScores.push(viewingScores.reduce((acc, curr) => acc * curr, 1));
    });
  });
  return Math.max(...allScores);
};

run({
  part1: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
