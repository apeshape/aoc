import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(""));

const connectors = {
  "|": "ns",
  "-": "ew",
  L: "ne",
  J: "nw",
  7: "sw",
  F: "se",
};

const possibleExits = {
  w: "-LF",
  e: "7J-",
  s: "|LJ",
  n: "|7F",
};

const dirs = {
  w: [-1, 0],
  e: [1, 0],
  n: [0, -1],
  s: [0, 1],
};
const getNeighbors = (grid, pos) => {
  const neighbors = Object.entries(dirs).reduce((acc, [dir, [x, y]]) => {
    return {
      ...acc,
      [dir]: grid[pos?.[1] + y]?.[pos?.[0] + x],
    };
  }, {});
  return neighbors;
};

const getPossibleExits = (neighbors, pos, currPipe) => {
  const exits = [];
  Object.entries(neighbors).forEach(([dir, pipe]) => {
    if (possibleExits[dir].includes(pipe)) {
      if (currPipe === undefined || connectors[currPipe].includes(dir)) {
        exits.push([pos[0] + dirs[dir][0], pos[1] + dirs[dir][1]]);
      }
    }
  });
  return exits;
};

const walkGrid = (grid, start) => {
  let i = 0;
  const visited = [JSON.stringify(start)];
  let next = [...start];
  while (next !== undefined && i < 10000) {
    const currPipe = grid[next[1]][next[0]];
    const ns = getNeighbors(grid, next);
    const ex1 = getPossibleExits(ns, next, currPipe).filter(
      (e) => !visited.includes(JSON.stringify(e)),
    );
    next = ex1[0];

    visited.push(JSON.stringify(next));

    i++;
  }

  return visited;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const start = input.reduce((acc, curr, idx) => {
    if (curr.includes("S")) return [curr.indexOf("S"), idx];
    return acc;
  }, []);

  const neighbors = getNeighbors(input, start);
  const exits = getPossibleExits(neighbors, start);
  const visited1 = walkGrid(input, exits[0]);
  const visited2 = walkGrid(input, exits[1]);

  let score = 0;
  visited1.forEach((v1, idx) => {
    if (v1 === visited2[idx] && score === 0) {
      score = idx + 1;
    }
  });

  return score;
};

function getShoelaceArea(input, loop) {
  let area = 0;

  // const boundariesCount = loop.length;

  const vertices = loop.filter((point) =>
    "FJL7S".includes(input[point[1]][point[0]]),
  );
  vertices
    .map((p) => p)
    .forEach((point, idx) => {
      const next = vertices[(idx + 1) % vertices.length];
      area += point[0] * next[1] - point[1] * next[0];
    });

  console.log(area / 2, loop.length);

  // return area - boundariesCount / 2 + 1;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const start = input.reduce((acc, curr, idx) => {
    if (curr.includes("S")) return [curr.indexOf("S"), idx];
    return acc;
  }, []);

  const exits = getPossibleExits(getNeighbors(input, start), start);
  const loopStrs = walkGrid(input, exits[0]);
  loopStrs.unshift(JSON.stringify(start));
  const loop = loopStrs.filter(Boolean).map(JSON.parse);
  // const testLoop = [
  //   [-3, -2],
  //   [-1, 4],
  //   [6, 1],
  //   [3, 10],
  //   [-4, 9],
  // ];
  console.log({ loop });
  getShoelaceArea(input, loop);

  // return getShoelaceArea(input, loop);
};

run({
  part1: {
    tests: [
      {
        input: `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`,

        expected: 4,
      },
      {
        input: `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "S7....\n||....\n||....\nLJ....",
        expected: 0,
      },
      {
        //   input: `...........
        // .S-------7.
        // .|F-----7|.
        // .||.....||.
        // .||.....||.
        // .|L-7.F-J|.
        // .|..|.|..|.
        // .L--J.L--J.
        // ...........`,
        //   expected: 4,
      },
      //       {
      //         input: `
      // .F----7F7F7F7F-7....
      // .|F--7||||||||FJ....
      // .||.FJ||||||||L7....
      // FJL7L7LJLJ||LJ.L-7..
      // L--J.L7...LJS7F-7L7.
      // ....F-J..F7FJ|L7L7L7
      // ....L7.F7||L7|.L7L7|
      // .....|FJLJ|FJ|F7|.LJ
      // ....FJL-7.||.||||...
      // ....L---J.LJ.LJLJ...`,
      //         expected: 8,
      //       },
      //       {
      //         input: `FF7FSF7F7F7F7F7F---7
      // L|LJ||||||||||||F--J
      // FL-7LJLJ||||||LJL-77
      // F--JF--7||LJLJ7F7FJ-
      // L---JF-JLJ.||-FJLJJ7
      // |F|F-JF---7F7-L7L|7|
      // |FFJF7L7F-JF7|JL---7
      // 7-L-JL7||F7|L7F-7F7|
      // L.L7LFJ|||||FJL7||LJ
      // L7JLJL-JLJLJL--JLJ.L`,
      //         expected: 10,
      //       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
