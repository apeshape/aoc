import run from "aocrunner";
import { inRange, askQuestion } from "../utils/index.js";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const instructions = parseInput(rawInput);
  let reg = 1;
  let programTotalCycles = 0;
  const signals = [];
  const readAt = [20, 60, 100, 140, 180, 220];
  const cycle = () => {
    programTotalCycles += 1;
    if (readAt.includes(programTotalCycles)) {
      signals.push(reg * programTotalCycles);
    }
  };
  for (const instr of instructions) {
    const [op, val] = instr.split(" ");
    if (op === "noop") {
      cycle();
    } else {
      cycle();
      cycle();
      reg += Number(val);
    }
  }
  return signals.reduce((acc, curr) => acc + curr, 0);
};

const printScreen = (scr) => {
  const rows = [];
  let row = [];
  scr.split("").forEach((c, i) => {
    if (i % 40 === 0) {
      rows.push([...row]);
      row = [];
    }
    row.push(c);
  });
  [...rows, row].forEach((r) => console.log(r.join("")));
};

const part2 = async (rawInput) => {
  const instructions = parseInput(rawInput);

  let reg = 1;
  let programTotalCycles = 0;
  let scr = "";
  const cycle = async () => {
    const pixelIsWithin = inRange(programTotalCycles % 40, reg - 1, reg + 1);
    scr += pixelIsWithin ? "#" : ".";
    programTotalCycles += 1;
  };

  for (const instr of instructions) {
    const [op, val] = instr.split(" ");
    if (op === "noop") {
      await cycle();
    } else {
      await cycle();
      await cycle();
      reg += Number(val);
    }
  }
  printScreen(scr);
  return "ERCREPCJ";
};
const testInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;
run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: `ERCREPCJ`,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
