import run from "aocrunner";
import { dijkstra } from "./dijk.js";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((r) => r.split("").map((c) => c.charCodeAt() - 96));

// const problem = {
//   start: {A: 5, B: 2},
//   A: {C: 4, D: 2},
//   B: {A: 8, D: 7},
//   C: {D: 6, finish: 3},
//   D: {finish: 1},
//   finish: {}
// };

const dirs = [
  [1, 0], //right
  [-1, 0], //left
  [0, 1], //down
  [0, -1], //up
];
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const getNeighbours = (x, y) => {
    const ns = {};
    dirs.forEach((dir) => {
      const n = input[y + dir[1]]?.[x + dir[0]];
      if (n !== undefined) {
        ns[`${x + dir[0]}_${y + dir[1]}`] = n;
      }
    });
    return ns;
  };
  const makeGraph = (input) => {
    const g = {};
    input.forEach((row, y) => {
      row.forEach((_col, x) => {
        const key =
          x === 0 && y === 0
            ? "start"
            : input[y][x] === -27
            ? "finish"
            : `${x}_${y}`;
        g[key] = getNeighbours(x, y);
      });
    });
    return g;
  };
  const graph = makeGraph(input);
  console.log("GRAPH", graph);
  const d = dijkstra(graph);
  console.log(d);
  return;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
