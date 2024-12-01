import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n\n");

const getColumns = (boxInput) => {
  const boxRows = boxInput.split("\n");
  const columns = {};
  boxRows.forEach((boxRow, idx) => {
    let col = 0;
    if (idx === boxRows.length - 1) return;
    boxRow.split("").forEach((c, i) => {
      let colBox;
      if (i % 4 === 0) {
        col = i / 4;
        colBox = boxRow.substring(i, i + 4).match(/[A-Z]/)?.[0] || undefined;
        if (colBox) {
          if (!columns[col]) {
            columns[col] = [colBox];
          } else {
            columns[col].push(colBox);
          }
        }
      }
    });
  });
  Object.values(columns).forEach((col) => col.reverse());
  return columns;
};

const printCols = (cols) => {
  const rows = Math.max(...Object.values(cols).map((col) => col.length));
  let row = rows;
  console.log("----------");
  while (row > 0) {
    console.log(
      Object.values(cols)
        .map((col) => col[row - 1] || ".")
        .join(" | "),
    );
    row--;
  }
};

const move = (columns, instruction, reverse = true) => {
  const inst = instruction;
  const [amount, from, to] = inst.match(/\d+/g).map(Number);

  const colFr = columns[from - 1];
  const colTo = columns[to - 1];
  const toMove = colFr.splice(amount * -1);
  if (reverse) {
    toMove.reverse();
  }
  colTo.push(...toMove);
};

const part1 = async (rawInput) => {
  const [boxes, instructionsInput] = parseInput(rawInput);
  const columns = getColumns(boxes);
  const instructions = instructionsInput.split("\n");
  instructions.forEach((inst) => move(columns, inst));

  const output = Object.values(columns).map((col) => col[col.length - 1]);
  console.log(output.join(""));

  return output.join("");
};

const part2 = (rawInput) => {
  const [boxes, instructionsInput] = parseInput(rawInput);
  const columns = getColumns(boxes);
  const instructions = instructionsInput.split("\n");
  instructions.forEach((inst) => move(columns, inst, false));

  const output = Object.values(columns).map((col) => col[col.length - 1]);
  console.log(output.join(""));

  return output.join("");
};

run({
  part1: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
