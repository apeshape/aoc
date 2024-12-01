import run from "aocrunner";

const directions = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, -1],
  D: [0, 1],
};

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((l) => l.trim())
    .map((l) => l.split(" "));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  console.log({ input });
  const digs = [];
  let pos = [0, 0];
  input.forEach(([dir, countStr], idx) => {
    const count = Number(countStr);
    let i = 0;
    while (i < count) {
      pos = [pos[0] + directions[dir][0], pos[1] + directions[dir][1]];
      digs.push([...pos]);
      i++;
    }
  });
  console.log(digs);

  const maxX = Math.max(...digs.map((dig) => dig[0]));
  const minX = Math.min(...digs.map((dig) => dig[0]));
  const maxY = Math.max(...digs.map((dig) => dig[1]));
  const minY = Math.min(...digs.map((dig) => dig[1]));
  const width = maxX - minX;
  const offsetX = width - maxX;
  const height = maxY - minY;
  const offsetY = height - maxY;

  console.log({ offsetY });
  let y = 0;
  while (y < height / 2) {
    let row = "";
    let x = 0;
    while (x < width / 2) {
      if (
        digs
          .map((d) => JSON.stringify(d))
          .includes(JSON.stringify([x - offsetX, y - offsetY]))
      ) {
        row += "#";
      } else {
        row += ".";
      }
      x++;
    }
    console.log(row);
    y++;
  }

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
        input: `R 2 (#70c710)
        U 2
        R 4
        D 2
        D 5 (#0dc571)
        L 2 (#5713f0)
        D 2 (#d2c081)
        R 2 (#59c680)
        D 2 (#411b91)
        L 5 (#8ceee2)
        U 2 (#caa173)
        L 1 (#1b58a2)
        U 2 (#caa171)
        R 2 (#7807d2)
        U 3 (#a77fa3)
        L 2 (#015232)
        U 2 (#7a21e3)`,
        expected: "",
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
  onlyTests: false,
});
