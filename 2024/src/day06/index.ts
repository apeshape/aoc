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
  let currentPos = [guardPosX, guardPosY];
  grid[currentPos[1]][currentPos[0]] = "X";
  let dirIdx = 0;
  let score = 0;
  const move = () => {
    let dir = directions[dirIdx % 4];
    let nextStep = [currentPos[0] + dir[0], currentPos[1] + dir[1]];
    if (nextStep[1] >= grid.length || nextStep[1] < 0) return false;
    if (nextStep[0] >= grid[0].length || nextStep[0] < 0) return false;
    if (grid[nextStep[1]][nextStep[0]] === "#") {
      dirIdx += 1;
      dir = directions[dirIdx % 4];
      nextStep = [currentPos[0] + dir[0], currentPos[1] + dir[1]];
    }
    grid[nextStep[1]][nextStep[0]] = "X";
    currentPos = [...nextStep];
    return true;
  };
  while (move()) {}
  score = grid.reduce(
    (acc, curr) => acc + curr.filter((x) => x === "X").length,
    0,
  );
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
  p.pop();
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
  const move2 = (gr: Array<string[]>, sp: number[]) => {
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
      pos[0] += dir[0];
      pos[1] += dir[1];
      const visitedStr = JSON.stringify([pos[0], pos[1]]);
      visited.push(visitedStr);
      if (visited.length > 10000) {
        return true;
      }
      // if (visited.filter((x) => x === visitedStr).length > 2) {
      //   // console.log("FOUND LOOP");
      //   return true;
      // }
    }
    return false;
  };

  let tested = 0;
  const setObstAndTestLoop = (pathItem: string) => {
    const pi = JSON.parse(pathItem);

    const obstPos = [...pi];
    const testGrid = JSON.parse(JSON.stringify(gridOriginal));

    testGrid[obstPos[1]][obstPos[0]] = "#";

    const hasLoop = move2(testGrid, [guardPosX, guardPosY]);
    if (hasLoop) {
      score += 1;
      // console.log(`Found loop: ${score}, tested ${tested}/${path.length}`);
    }
    tested += 1;
  };

  const path = [...getPath(grid, [guardPosX, guardPosY])];
  path.pop();

  console.time("FIND LOOPS");
  path.forEach((p) => {
    setObstAndTestLoop(p);
  });

  console.timeEnd("FIND LOOPS");
  // Should be 1933
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
