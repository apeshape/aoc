import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split(""));

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
const getPath = (gr: Array<string[]>, sp: number[]) => {
  let dirI = 0;
  let dir = directions[dirI % 4];
  const pos = [...sp];

  const path = new Set<string>();

  while (
    pos[0] >= 0 &&
    pos[0] < gr[0].length &&
    pos[1] >= 0 &&
    pos[1] < gr.length
  ) {
    if (gr[pos[1] + dir[1]]?.[pos[0] + dir[0]] === "#") {
      dirI += 1;
      dir = directions[dirI % 4];
    }
    path.add(JSON.stringify(pos));

    pos[0] += dir[0];
    pos[1] += dir[1];
  }

  return path;
};

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput);

  const guardPosY = grid.findIndex((l) => l.includes("^"));
  const guardPosX = grid[guardPosY].findIndex((x) => x === "^");

  const path = [...getPath(grid, [guardPosX, guardPosY])];
  return path.length;
};

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput);

  const guardPosY = grid.findIndex((l) => l.includes("^"));
  const guardPosX = grid[guardPosY].findIndex((x) => x === "^");

  const hasLoop = (gr: Array<string[]>, sp: number[]) => {
    let dirI = 0;
    let dir = directions[dirI % 4];
    const pos = [...sp];
    const visited = [];
    while (
      pos[0] >= 0 &&
      pos[0] < gr[0].length &&
      pos[1] >= 0 &&
      pos[1] < gr.length
    ) {
      if (gr[pos[1] + dir[1]]?.[pos[0] + dir[0]] === "#") {
        dirI += 1;
        dir = directions[dirI % 4];
      }
      if (gr[pos[1] + dir[1]]?.[pos[0] + dir[0]] === "#") {
        dirI += 1;
        dir = directions[dirI % 4];
      }
      pos[0] += dir[0];
      pos[1] += dir[1];
      const visitedStr = JSON.stringify([pos[0], pos[1]]);
      visited.push(visitedStr);
      if (visited.length > 6000) {
        return true;
      }
    }
    return false;
  };

  const setObstAndTestLoop = (pathItem: string) => {
    const obstPos = JSON.parse(pathItem);
    const testGrid = JSON.parse(JSON.stringify(grid));

    testGrid[obstPos[1]][obstPos[0]] = "#";

    return hasLoop(testGrid, [guardPosX, guardPosY]);
  };

  const path = [...getPath(grid, [guardPosX, guardPosY])];
  const loopPositions = path.filter((p) => {
    return setObstAndTestLoop(p);
  });
  return loopPositions.length;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
