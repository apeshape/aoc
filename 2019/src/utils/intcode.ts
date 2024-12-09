import { clone } from "./index.js";

interface op {
  op: (a: number, b: number) => number | void;
  size: number;
}
const OPS: Record<number, op> = {
  1: {
    op: (a: number, b: number) => a + b,
    size: 4,
  },
  2: {
    op: (a: number, b: number) => a * b,
    size: 4,
  },
  3: {
    op: () => {},
    size: 2,
  },
  4: {
    op: () => {},
    size: 2,
  },
  99: {
    op: () => {},
    size: 1,
  },
};

const parseInstruction = (
  program: number[],
  input: number,
  ...params: number[]
) => {
  const [opCode, ...rest] = params;
  const [currentinstruction, _d, param1mode, param2mode, param3mode] = opCode
    .toString()
    .split("")
    .reverse()
    .map(Number);
  const op = OPS[currentinstruction];
  switch (currentinstruction) {
    case 1:
    case 2: {
      const [arg1, arg2, arg3] = rest;
      const value1 = param1mode === 1 ? arg1 : program[arg1];
      const value2 = param2mode === 1 ? arg2 : program[arg2];
      const dest = param3mode === 1 ? arg3 : program[arg3];
      const result = op.op(value1, value2);
      console.log("ADD", arg1, program[arg1], value1, value2, param3mode);
      program[dest] = result as number;
      break;
    }
    case 3: {
      const [dest] = rest;
      // const destAdress = param1mode === 1 ? dest : program[dest];
      program[dest] = input;
      console.log("input received:", dest, program[dest]);
    }
    case 4: {
      const [arg1] = rest;
      const value = param1mode === 1 ? arg1 : program[arg1];
      console.log({ param1mode, arg1 });
      console.log({ value });
    }
  }
};

export const intcode = (program: number[], input: number) => {
  let pc = 0;
  let currentinstruction: number;
  const programCpy = clone(program);
  while (true) {
    currentinstruction = programCpy[pc];
    if (currentinstruction === 99) break;
    const ci = Number(currentinstruction.toString().split("").reverse()[0]);
    if (ci in OPS) {
      const op = OPS[ci];
      const instructionData = programCpy.slice(pc, pc + op.size);
      parseInstruction(programCpy, input, ...instructionData);
      pc += op.size;
      continue;
    } else {
      console.warn("Unknown instruction", currentinstruction, pc);
      break;
    }
  }
  // console.log("PROGRAM ENDED");
  return programCpy;
};
