import run from "aocrunner";
import { clone } from "../utils/index.js";
type Point = [number, number];
interface Neighbour {
  dir: Point;
  val: number;
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split("").map(Number));

const trailHeads = (grid: number[][]) => {
  return grid.reduce((acc, line, idx) => {
    if (line.includes(0)) {
      const points = line.reduce((a, p, i) => {
        if (p === 0) {
          a.push([i, idx]);
        }
        return a;
      }, [] as Point[]);
      acc.push(...points);
    }
    return acc;
  }, [] as Point[]);
};

const getGridValue = (p: Point, grid: number[][]) => {
  return grid[p[1]]?.[p[0]];
};

const dirs: Point[] = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];
const getNeighbours = (p: Point, grid: number[][]): Neighbour[] => {
  const ns: Neighbour[] = [];
  dirs.forEach((dir) => {
    const n = getGridValue([p[0] + dir[0], p[1] + dir[1]], grid);
    if (n !== undefined) {
      ns.push({
        dir: dir,
        val: n,
      });
    }
  });
  return ns;
};

const getPaths = (startPoint: Point, grid: number[][], distinct = false) => {
  const hillsVisited: string[] = [];
  const paths: Point[][] = [];
  const walk = (point: Point, path: Point[] = []) => {
    const current = getGridValue(point, grid);
    if (current === 9) {
      path.push(point);
      if (!distinct) {
        if (!hillsVisited.includes(JSON.stringify(point))) {
          hillsVisited.push(JSON.stringify(point));
          paths.push(path);
        }
      } else {
        paths.push(path);
      }
      return path;
    }

    const possibleSteps = getNeighbours(point, grid).filter(
      (n) => current + 1 === n.val,
    );
    for (let i = 0; i < possibleSteps.length; i++) {
      const ps = possibleSteps[i];
      const nextStep: Point = [point[0] + ps.dir[0], point[1] + ps.dir[1]];
      walk(nextStep, [...path, point]);
    }

    return path;
  };

  walk(startPoint);
  return paths.length;
};

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput);
  return trailHeads(grid).reduce((acc, p) => acc + getPaths(p, grid), 0);
};

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput);
  return trailHeads(grid).reduce((acc, p) => acc + getPaths(p, grid, true), 0);
};

run({
  part1: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 81,
      },
      {
        input: `0123456789876543210123456789876543210
1234567898987654321234567898987654321
2345678987898765432345678987898765432
3456789876789876543456789876789876543
4567898765678987654567898765678987654
5678987654567898765678987654567898765
6789876543456789876789876543456789876
7898765412345678987898765432105678987
8987654301234567898987654321214567898
9876543210123456789876543210123456789
8987654321214567898987654301234567898
7898765432105678987898765432321678987
6789876543456789876789876543210789876
5678987654567898765678987654567898765
4567898765678987654567898765678987654
3456789876789876543456789876789876543
2345678987898765432345678987898765432
1234567898987654321234567898987654321
0123456789876543210123456789876543210
1234567898987654321234567898987654321
2345678987898765410145678987898765432
3456789876789876543456789876789876543
4567898765678987652567898765678987654
5678987654567898761678987654567898765
6789876543456789870789012543456789876
7898765432345678989898123432345678987
8987654321234567898987654321234567898
9876543210123456789876543210123456789
8987654321214567898987654321234567898
7898765432105678987898765432345678987
6789876543456789876789876543456789876
5678987654567898765678987654567898765
4567898765678987654567898765678987654
3456789876789876543456789876789876543
2345678987898765432345678987898765432
1234567898987654321234567898987654321
0123456789876543210123456789876543210`,
        expected: 16451,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
