import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split(""));

const getAntennas = (grid: string[][]) => {
  const antennas: Record<string, number[][]> = {};
  grid.forEach((l, y) => {
    l.forEach((c, x) => {
      if (c !== ".") {
        if (!antennas[c]) antennas[c] = [[x, y]];
        else antennas[c].push([x, y]);
      }
    });
  });
  return antennas;
};

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput);
  const findAntinodes = (antennaLocation: number[], rest: number[][]) => {
    rest.forEach((otherLocation) => {
      const diff = [
        otherLocation[0] - antennaLocation[0],
        otherLocation[1] - antennaLocation[1],
      ];
      const antinodePos = [
        otherLocation[0] + diff[0],
        otherLocation[1] + diff[1],
      ];

      if (
        grid[antinodePos[1]]?.[antinodePos[0]] &&
        grid[antinodePos[1]]?.[antinodePos[0]] !== "#"
      ) {
        grid[antinodePos[1]][antinodePos[0]] = "#";
      }
    });
  };

  Object.values(getAntennas(grid)).forEach((antennaList) =>
    antennaList.forEach((al) => {
      const rest = antennaList.filter(
        (x) => JSON.stringify(x) !== JSON.stringify(al),
      );
      findAntinodes(al, rest);
    }),
  );

  return grid.reduce((acc, l) => acc + l.filter((x) => x === "#").length, 0);
};

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput);
  const findAntinodes = (antennaLocation: number[], rest: number[][]) => {
    rest.forEach((otherLocation) => {
      const diff = [
        otherLocation[0] - antennaLocation[0],
        otherLocation[1] - antennaLocation[1],
      ];
      let antinodePos = [
        otherLocation[0] + diff[0],
        otherLocation[1] + diff[1],
      ];

      while (grid[antinodePos[1]]?.[antinodePos[0]]) {
        grid[antinodePos[1]][antinodePos[0]] = "#";
        antinodePos = [antinodePos[0] + diff[0], antinodePos[1] + diff[1]];
      }
    });
  };

  Object.values(getAntennas(grid)).forEach((antennaList: number[][]) => {
    antennaList.forEach((al) => {
      const rest = antennaList.filter(
        (x) => JSON.stringify(x) !== JSON.stringify(al),
      );
      findAntinodes(al, rest);
    });
  });

  return grid.reduce((acc, l) => acc + l.filter((x) => x !== ".").length, 0);
};

run({
  part1: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 34,
      },
      {
        input: `T.........
...T......
.T........
..........
..........
..........
..........
..........
..........
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
