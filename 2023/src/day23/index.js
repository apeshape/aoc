import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((l) => l.split(""));
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

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const start = [input[0].indexOf("."), 0];
  const end = [input.slice(-1)[0].indexOf("."), input.length - 1];

  const allPaths = [];
  const walk = (from, path) => {
    if (!from) return path;
    path.push(JSON.stringify(from));
    const ns = getNeighbors(input, from);
    const possiblePaths = Object.entries(ns)
      .filter(([dir, tile]) => {
        if (tile === ".") return true;
        if (tile === "<" && dir === "w") return true;
        if (tile === ">" && dir === "e") return true;
        if (tile === "v" && dir === "s") return true;
        if (tile === "^" && dir === "n") return true;
      })
      .map(([dir]) => [from[0] + dirs[dir][0], from[1] + dirs[dir][1]])
      .filter((possible) => !path.includes(JSON.stringify(possible)));

    for (const possible of possiblePaths) {
      allPaths.push(walk(possible, [...path]));
    }
    return path;
  };
  const p = walk(start, []);
  const completePaths = allPaths
    .filter((p) => p.includes(JSON.stringify(end)))
    .map((completePath) => {
      return completePath.length - 1;
    });

  return Math.max(...completePaths);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const start = [input[0].indexOf("."), 0];
  const end = [input.slice(-1)[0].indexOf("."), input.length - 1];

  const allPaths = [];
  const walk = (from, path) => {
    if (!from) return path;
    path.push(JSON.stringify(from));
    const ns = getNeighbors(input, from);
    const possiblePaths = Object.entries(ns)
      .filter(([dir, tile]) => {
        if (".<>v^".includes(tile)) return true;
      })
      .map(([dir]) => [from[0] + dirs[dir][0], from[1] + dirs[dir][1]])
      .filter((possible) => !path.includes(JSON.stringify(possible)));

    for (const possible of possiblePaths) {
      allPaths.push(walk(possible, [...path]));
    }
    return path;
  };
  const p = walk(start, []);
  const completePaths = allPaths
    .filter((p) => p.includes(JSON.stringify(end)))
    .map((completePath) => {
      return completePath.length - 1;
    });

  return Math.max(...completePaths);
};

run({
  part1: {
    tests: [
      {
        input: `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`,
        expected: 94,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`,
        expected: 154,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
