import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const parts = rawInput.split("\n\n");
  const [orderingRules, manuals] = [
    parts[0].split("\n").map((l) => l.split("|").map(Number)),
    parts[1].split("\n").map((l) => l.split(",").map(Number)),
  ];
  return [orderingRules, manuals];
};

const isCorrect = (man: number[], ordering: Record<number, number[]>) => {
  let valid = true;
  const copy = [...man];
  copy.forEach((page, idx) => {
    if (page in ordering) {
      const pagesBefore = man.slice(idx + 1);
      pagesBefore.forEach((pb) => {
        if (ordering[page].includes(pb)) {
          valid = false;
        }
      });
    }
  });
  return valid;
};

const getOrderingRules = (rules: number[][]) => {
  return rules.reduce((acc, curr) => {
    const [before, after] = curr;
    if (after in acc) {
      acc[after].push(before);
      return acc;
    } else {
      return {
        ...acc,
        [after]: [before],
      };
    }
  }, {} as Record<number, number[]>);
};

const getScore = (manuals: number[][]): number =>
  manuals.reduce((acc, man) => (acc += man[Math.floor(man.length / 2)]), 0);

const part1 = (rawInput: string) => {
  const [orderingRules, manuals] = parseInput(rawInput);
  const ordering = getOrderingRules(orderingRules);
  return getScore(manuals.filter((man) => isCorrect(man, ordering)));
};

const part2 = (rawInput: string) => {
  const [orderingRules, manuals] = parseInput(rawInput);
  const ordering = getOrderingRules(orderingRules);

  const mend = (man: number[], ordering: Record<number, number[]>) => {
    let copy = [...man];
    copy.forEach((page, idx) => {
      if (page in ordering) {
        const pagesAfter = man.slice(idx + 1);
        pagesAfter.forEach((pb) => {
          if (ordering[page].includes(pb)) {
            const swapArray = copy.filter((x) => x !== page);
            const swapToIndex1 = swapArray.findIndex((x) => x === pb);
            swapArray.splice(swapToIndex1 + 1, 0, page);
            copy = [...swapArray];
          }
        });
      }
    });
    return copy;
  };

  let fixedManuals = manuals
    .filter((m) => !isCorrect(m, ordering))
    .map((m) => mend(m, ordering));
  fixedManuals = fixedManuals.map((m) => mend(m, ordering));
  fixedManuals = fixedManuals.map((m) => mend(m, ordering));
  fixedManuals = fixedManuals.map((m) => mend(m, ordering));
  fixedManuals = fixedManuals.map((m) => mend(m, ordering));

  return getScore(fixedManuals);
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
