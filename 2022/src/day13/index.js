import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const zip = (a, b) =>
  Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);

const loglvl = (lvl, ...params) => {
  return;
  console.log(
    Array(lvl + 1)
      .fill("  ")
      .join(""),
    ...params,
  );
};

const compare = (left, right) => {
  const pairs = zip(left, right);
  for (const [l, r] of pairs) {
    if (typeof l === "undefined") return -1;
    if (typeof r === "undefined") return 1;
    if (typeof l === "number" && typeof r === "number") {
      if (l !== r) {
        return l < r ? -1 : 1;
      }
    }

    let res;
    if (typeof l === "object" && typeof r === "object") {
      res = compare(l, r);
    }
    if (typeof l === "object" && typeof r === "number") {
      res = compare(l, [r]);
    }
    if (typeof l === "number" && typeof r === "object") {
      res = compare([l], r);
    }
    if (typeof res !== "undefined") return res;
  }
};

const part1 = (rawInput) => {
  const pairs = parseInput(rawInput)
    .split("\n\n")
    .map((p) => p.split("\n").map((a) => JSON.parse(a)));
  let total = 0;
  pairs.forEach((p, i) => {
    const isCorrect = compare(p[0], p[1]);
    if (isCorrect === -1) {
      total += i + 1;
    }
  });
  return total;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace("\n\n", "\n")
    .split("\n")
    .filter((d) => d !== "")
    .map(JSON.parse);

  const div1 = [[2]];
  const div2 = [[6]];
  input.push(div1);
  input.push(div2);

  const sorted = input.sort(compare);
  const idx1 =
    sorted.findIndex((e) => JSON.stringify(div1) === JSON.stringify(e)) + 1;
  const idx2 =
    sorted.findIndex((e) => JSON.stringify(div2) === JSON.stringify(e)) + 1;

  return idx1 * idx2;
};

const testInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
