import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split(""));

const printGrid = (grid: Array<string[]>) => {
  console.log(" ==== grid ====");
  grid.forEach((l) => console.log(l.join("")));
  console.log(" --------------");
};

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput);

  const guardPosY = grid.findIndex((l) => l.includes("^"));
  const guardPosX = grid[guardPosY].findIndex((x) => x === "^");

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
      pos[0] += dir[0];
      pos[1] += dir[1];
      path.add(JSON.stringify(pos));
    }
    return path;
  };
  const p = [...getPath(grid, [guardPosX, guardPosY])];
  return p.length;
};

const part2 = (rawInput: string) => {
  const gridOriginal = parseInput(rawInput);

  let grid: Array<string[]> = JSON.parse(JSON.stringify(gridOriginal));

  const guardPosY = grid.findIndex((l) => l.includes("^"));
  const guardPosX = grid[guardPosY].findIndex((x) => x === "^");
  let score = 0;

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
      pos[0] += dir[0];
      pos[1] += dir[1];
      path.add(JSON.stringify(pos));
    }
    return path;
  };
  const move = (gr: Array<string[]>, sp: number[]) => {
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
      if (visited.length > 8000) {
        return true;
      }
    }
    return false;
  };

  let tested = 0;
  const setObstAndTestLoop = (pathItem: string) => {
    const pi = JSON.parse(pathItem);

    const obstPos = [...pi];
    const testGrid = JSON.parse(JSON.stringify(gridOriginal));

    testGrid[obstPos[1]][obstPos[0]] = "#";

    const hasLoop = move(testGrid, [guardPosX, guardPosY]);
    if (hasLoop) {
      score += 1;
    }
    tested += 1;
  };

  const path = [...getPath(grid, [guardPosX, guardPosY])];
  path.pop();
  path.forEach((p) => {
    setObstAndTestLoop(p);
  });
  return score;
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
