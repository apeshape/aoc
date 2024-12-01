import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(",");

const doHash = (str) => {
  let currentValue = 0;
  str.split("").forEach((c) => {
    currentValue += c.charCodeAt();
    currentValue *= 17;
    currentValue = currentValue % 256;
  });
  return currentValue;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.reduce((acc, str) => acc + doHash(str), 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const boxes = [];
  let i = 0;
  while (i < 256) {
    boxes.push(new Array());
    i++;
  }

  const findLens = (box, label) => {
    const labels = box.map((l) => Object.keys(l)[0]);
    if (labels.indexOf(label) !== -1) {
      return labels.indexOf(label);
    }
  };
  input.forEach((instr) => {
    const opType = instr.match(/=|-/)[0];
    const [lensLabel, val] = instr.split(opType);

    const box = boxes[doHash(lensLabel)];

    if (opType === "-") {
      const idx = findLens(box, lensLabel);
      if (idx !== undefined) {
        box.splice(idx, 1);
      }
    }

    if (opType === "=") {
      if (findLens(box, lensLabel) !== undefined) {
        box[findLens(box, lensLabel)] = {
          [lensLabel]: val,
        };
      } else {
        box.push({
          [lensLabel]: val,
        });
      }
    }
  });
  let score = 0;

  boxes.forEach((box, bidx) => {
    if (box.length > 0) {
      const boxNr = bidx + 1;
      box.forEach((box, idx) => {
        const lensPos = idx + 1;
        const focalLength = Number(Object.values(box)[0]);
        score += boxNr * lensPos * focalLength;
      });
    }
  });

  return score;
};

const input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";

run({
  part1: {
    tests: [
      {
        input,
        expected: 1320,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
