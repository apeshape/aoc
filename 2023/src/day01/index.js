import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const wordNums = "one|two|three|four|five|six|seven|eight|nine";
const wordArr = wordNums.split("|");
const getNum = (t) => (wordArr.includes(t) ? wordArr.indexOf(t) + 1 : t);
const findDigit = (part2) => (l) => {
  const s = [
    ...l.matchAll(new RegExp(`\\d${part2 ? `|${wordNums}` : ""}`, "ig")),
  ].sort((m1, m2) => m1.index - m2.index);
  return Number(`${getNum(s[0][0])}${getNum(s.at(-1)[0])}`);
};

const solve = (part1, rawInput) =>
  parseInput(rawInput)
    .map(findDigit(part1))
    .reduce((acc, line) => acc + line, 0);

run({
  part1: {
    tests: [
      {
        input: `1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`,
        expected: 142,
      },
    ],
    solution: (rawInput) => solve(false, rawInput),
  },
  part2: {
    tests: [
      {
        input: `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: (rawInput) => solve(true, rawInput),
  },
  trimTestInputs: true,
  onlyTests: false,
});
