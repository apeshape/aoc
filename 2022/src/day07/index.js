import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");
const sumDirectory = (directory, allowedDirs, sumTest) => {
  return Object.entries(directory).reduce((acc, [name, item]) => {
    if (name !== "..") {
      if (isNaN(item)) {
        const dirSum = sumDirectory(item, allowedDirs, sumTest);
        if (sumTest(dirSum)) {
          allowedDirs.push(dirSum);
        }
        acc += dirSum;
      } else {
        acc += item;
      }
    }
    return acc;
  }, 0);
};

const getFs = (stdout) => {
  const fs = {};
  let currentDir = fs;
  stdout.forEach((line) => {
    if (line.startsWith("$")) {
      const [, command, arg1] = line.split(" ");
      if (command === "cd" && arg1 !== "/") {
        currentDir = currentDir[arg1];
      }
    } else {
      if (line.startsWith("dir")) {
        const dirname = line.split("dir ")[1];
        if (!currentDir[dirname]) {
          currentDir[dirname] = {
            "..": currentDir,
          };
        }
      } else {
        const [fileSize, fileName] = line.split(" ");
        currentDir[fileName] = Number(fileSize);
      }
    }
  });
  return fs;
};

const part1 = (rawInput) => {
  const stdout = parseInput(rawInput);
  const fs = getFs(stdout);
  const allowedDirs = [];
  const test = (dirSum) => dirSum <= 100000;
  sumDirectory(fs, allowedDirs, test);
  return allowedDirs.reduce((acc, dir) => acc + dir);
};

const part2 = (rawInput) => {
  const stdout = parseInput(rawInput);
  const fs = getFs(stdout);
  const diskSize = 70000000;
  const totalSum = sumDirectory(fs, [], () => true);
  const unusedSpace = diskSize - totalSum;

  const test = (dirSum) => dirSum + unusedSpace >= 30000000;

  const possibleDeletes = [];
  sumDirectory(fs, possibleDeletes, test);
  return Math.min(...possibleDeletes);
};

run({
  part1: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
