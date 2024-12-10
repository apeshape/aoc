import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("").map(Number);

const getResult = (arr: (number | ".")[]) =>
  arr
    .filter((x) => x !== "." && x !== undefined)
    .reduce((acc, c, idx) => {
      acc += c * idx;
      return acc;
    }, 0);

const getFileArray = (input: number[]) => {
  const fileArr: Array<"." | number> = [];
  let fileIdx = 0;
  for (let i = 0; i < input.length; i += 2) {
    const length = input[i];
    const space = input[i + 1];
    fileArr.push(...Array(length).fill(fileIdx));
    if (space) {
      fileArr.push(...Array(space).fill("."));
    }
    fileIdx += 1;
  }

  return fileArr;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const getLastNumber = (arr: Array<"." | number>): [number, number] => {
    for (let i = arr.length - 1; i > 0; i--) {
      if (arr[i] !== ".") {
        return [arr[i] as number, i];
      }
    }
    return [0, 0];
  };
  const fileArr = getFileArray(input);

  for (let i = 0; i < fileArr.length; i++) {
    const c = fileArr[i];
    if (c === ".") {
      const [lastNumber, lastNumberIdx] = getLastNumber(fileArr);
      fileArr[i] = lastNumber;
      fileArr[lastNumberIdx] = ".";
      if (!fileArr.join("").match(/\d+\.+\d+/)) {
        break;
      }
    }
  }

  return getResult(fileArr);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const fileArr = getFileArray(input);

  let currentFile: number[] = [];
  let i = fileArr.length - 1;
  while (i) {
    const curr = fileArr[i];
    if (curr !== ".") {
      const next = fileArr[i - 1];
      currentFile.push(curr);

      if (curr !== next) {
        for (var j = 0; j < fileArr.length; j++) {
          const slice = fileArr.slice(j, j + currentFile.length);
          if (
            slice.length === currentFile.length &&
            slice.every((x) => x === ".") &&
            j < i
          ) {
            const dot = fileArr.splice(j, currentFile.length, ...currentFile);
            fileArr.splice(i, dot.length, ...dot);
            break;
          }
        }

        currentFile = [];
      }
    }
    i--;
  }

  let total = 0;
  fileArr.forEach((e, idx) => {
    if (e !== ".") {
      total += e * idx;
    }
  });
  return total;
};

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 1928,
      },
      {
        input: `252`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
      {
        input: `12345`,
        expected: 132,
      },
      {
        input: `252`,
        expected: 5,
      },
      {
        input: `1010101010101010101010`,
        expected: 385,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
