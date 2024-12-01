const dirs = [
  [0, 1], //N
  [1, 0], //E
  [-1, 0], //S
  [0, -1], //W
];
const currentPos = [0, 0];
let currentDir = dirs[0];

const dirnames = {
  "[0,1]": "N",
  "[1,0]": "E",
  "[-1,0]": "S",
  "[0,-1]": "W",
};

// const instructionsStr = "R2, L3";
// const instructionsStr = "R5, L5, R5, R3";
const instructionsStr =
  "R2, L1, R2, R1, R1, L3, R3, L5, L5, L2, L1, R4, R1, R3, L5, L5, R3, L4, L4, R5, R4, R3, L1, L2, R5, R4, L2, R1, R4, R4, L2, L1, L1, R190, R3, L4, R52, R5, R3, L5, R3, R2, R1, L5, L5, L4, R2, L3, R3, L1, L3, R5, L3, L4, R3, R77, R3, L2, R189, R4, R2, L2, R2, L1, R5, R4, R4, R2, L2, L2, L5, L1, R1, R2, L3, L4, L5, R1, L1, L2, L2, R2, L3, R3, L4, L1, L5, L4, L4, R3, R5, L2, R4, R5, R3, L2, L2, L4, L2, R2, L5, L4, R3, R1, L2, R2, R4, L1, L4, L4, L2, R2, L4, L1, L1, R4, L1, L3, L2, L2, L5, R5, R2, R5, L1, L5, R2, R4, R4, L2, R5, L5, R5, R5, L4, R2, R1, R1, R3, L3, L3, L4, L3, L2, L2, L2, R2, L1, L3, R2, R5, R5, L4, R3, L3, L4, R2, L5, R5";

const instructions = instructionsStr.split(", ").map((ins) => {
  const turn = ins[0];
  const steps = Number(ins.match(/\d+/)[0]);
  // console.log(ins[0], steps);
  return [turn === "R" ? 1 : -1, steps];
});

instructions.forEach((instr) => {
  const curDirIdx = dirs.findIndex((x) => {
    return JSON.stringify(x) === JSON.stringify(currentDir);
  });

  let newDirIdx = curDirIdx + instr[0];
  if (newDirIdx < 0) newDirIdx = 3;
  if (newDirIdx === 4) newDirIdx = 0;

  console.log(`Turn ${instr[0] === -1 ? "L" : "R"}, walk ${instr[1]} steps`);
  currentDir = dirs[newDirIdx];

  console.log(`Walking: ${dirnames[JSON.stringify(currentDir)]}`);
  for (let i = 0; i < instr[1]; i++) {
    currentPos[0] += currentDir[0];
    currentPos[1] += currentDir[1];
  }
});

console.log({ currentPos }, currentPos[0] + currentPos[1]);
