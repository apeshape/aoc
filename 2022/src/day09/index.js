import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");
const dirs = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
};

const getVisited = (rope, moves) => {
  const tailVisited = [];
  for (const instr of moves) {
    const [dir, steps] = instr.split(" ");
    const _dir = dirs[dir];
    let _steps = Number(steps);
    while (_steps) {
      let _knot = rope.length;
      while (_knot) {
        const ahead = rope[_knot];
        const knot = rope[_knot - 1];
        if (ahead === undefined) {
          knot[0] += _dir[0];
          knot[1] += _dir[1];
        } else {
          const newDir = getNewDir(ahead, knot);
          knot[0] += newDir[0];
          knot[1] += newDir[1];
          if (_knot === 1) {
            tailVisited.push(`${knot[0]}_${knot[1]}`);
          }
        }
        _knot--;
      }
      _steps--;
    }
  }

  return new Set(tailVisited).size;
};

const getRope = (size = 2, initial = [0, 0]) => {
  const rope = [];
  while (size) {
    rope.push([...initial]);
    size--;
  }
  return rope;
};
const normailzeDiff = (diff) => {
  const x = diff[0] < 0 ? -1 : diff[0] > 0 ? 1 : 0;
  const y = diff[1] < 0 ? -1 : diff[1] > 0 ? 1 : 0;
  return [x, y];
};

const getNewDir = (head, tail) => {
  const diff = [head[0] - tail[0], head[1] - tail[1]];
  if (Math.abs(diff[0]) < 2 && Math.abs(diff[1]) < 2) {
    return [0, 0];
  }
  return normailzeDiff(diff);
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const rope = getRope(2);

  return getVisited(rope, input);
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const rope = getRope(10);
  return getVisited(rope, input);
};

const drawRope = (rope) => {
  console.log("---- ROPE AT ----");
  const size = 30;
  for (let i = 0; i < size; i++) {
    let str = "";
    for (let j = 0; j < size; j++) {
      let ch = ".";
      for (let r = 0; r < rope.length; r++) {
        const knot = rope[r];
        if (knot[0] === j && knot[1] === size - 1 - i) {
          ch = r;
          if (r === 9) {
            ch = "H";
          }
        }
      }
      str += ch;
    }
    console.log(str);
  }
};

run({
  part1: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 1,
      },
      {
        input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
