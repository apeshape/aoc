import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((part) => part.split("\n"));

const part1 = (rawInput) => {
  const [workflowsList, parts] = parseInput(rawInput);
  const workflows = {};
  workflowsList.forEach((workflow) => {
    const [wfName, testParts] = workflow.slice(0, -1).split("{");
    workflows[wfName] = testParts.split(",");
  });

  const parsePart = (partStr) => {
    return partStr
      .slice(1)
      .slice(0, -1)
      .split(",")
      .reduce((acc, curr) => {
        const parts = curr.split("=");
        return {
          ...acc,
          [parts[0]]: Number(parts[1]),
        };
      }, {});
  };

  const isAccepted = (ratings, wfList) => {
    const nextRating = wfList.shift();
    if (!nextRating) return false;
    if (nextRating === "A") return true;
    if (nextRating === "R") return false;

    // console.log({ nextRating });
    const [test, dest] = nextRating.split(":");
    if (!dest) {
      if (dest === "A") return true;
      if (dest === "R") return false;
      return isAccepted(ratings, [...workflows[test]]);
    } else {
      const [category, value] = test.split(/<|>/);
      if (test.includes(">") && ratings[category] > value) {
        if (dest === "A") return true;
        if (dest === "R") return false;
        return isAccepted(ratings, [...workflows[dest]]);
      }
      if (test.includes("<") && ratings[category] < value) {
        if (dest === "A") return true;
        if (dest === "R") return false;
        return isAccepted(ratings, [...workflows[dest]]);
      }
    }

    return isAccepted(ratings, wfList);
  };

  let score = 0;
  parts.forEach((part) => {
    const ratings = parsePart(part);
    if (isAccepted(ratings, [...workflows.in])) {
      score += Object.values(ratings).reduce((a, c) => a + c, 0);
    }
  });

  return score;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`,
        expected: 19114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
