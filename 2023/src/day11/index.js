import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((l) => l.split(""));

const expandSpace = (grid) => {
  const dims = [grid[0].length, grid.length];
  const expandedGrid = [];

  const scale = 10000;

  grid.forEach((l) => {
    if (l.every((x) => x === ".")) {
      let i = 0;
      while (i < scale) {
        expandedGrid.push(Array(dims[1]).fill("."));
        i++;
      }
    }
    expandedGrid.push([...l]);
  });

  const expandCols = [];
  expandedGrid[0].forEach((c, idx) => {
    if (expandedGrid.every((l) => l[idx] === ".")) {
      expandCols.push(idx);
    }
  });

  expandCols.forEach((idx, i) => {
    expandedGrid.forEach((l) => {
      l.splice(idx + i, 0, ...Array(scale).fill("n"));
    });
  });

  return expandedGrid;
};

const getGalaxies = (grid) => {
  const galaxies = [];
  grid.forEach((l, y) => {
    const m = [...l.join("").matchAll("#")];
    m.forEach((match) => {
      galaxies.push([match.index, y]);
    });
  });
  return galaxies;
};

const getPairs = (galaxies) => {
  const allGalaxies = [...galaxies];
  const pairs = [];
  while (allGalaxies.length > 0) {
    const toTest = allGalaxies.pop();
    allGalaxies.forEach((g) => {
      pairs.push([toTest, g]);
    });
  }
  return pairs;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const expandedGrid = expandSpace(input);
  const galaxies = getGalaxies(expandedGrid);
  const pairs = getPairs(galaxies);

  // expandedGrid.forEach((l) => console.log(l.join("")));

  const getDistance = ([g1, g2]) => {
    return Math.abs(g2[0] - g1[0]) + Math.abs(g2[1] - g1[1]);
  };

  let score = 0;
  pairs.forEach((p) => {
    score += getDistance(p);
  });

  return score;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 374,
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
