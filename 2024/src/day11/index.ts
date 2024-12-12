import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(" ").map(Number);

const splitStone = (stone: number) => {
  const strStone = String(stone);
  if (strStone === "0") {
    return [1];
  }
  if (strStone.length % 2 === 0) {
    const left = strStone.slice(0, strStone.length / 2);
    const right = strStone.slice(strStone.length / 2);
    return [Number(left), Number(right)];
  }
  return [stone * 2024];
};

const blink = (stones: number[]) => {
  const newStones: number[] = [];
  stones.forEach((stone) => {
    const newStone = splitStone(stone);
    newStones.push(...newStone);
  });
  return newStones;
};

const part1 = (rawInput: string) => {
  let stones = parseInput(rawInput);
  let score = 0;

  // const blink2 = (stone: number, lvl = 0) => {
  //   const newStone = splitStone(stone);
  //   if (lvl === 25) {
  //     score += 1;
  //     return stone;
  //   }
  //   if (newStone.length === 1) {
  //     blink2(newStone[0], lvl + 1);
  //   } else {
  //     blink2(newStone[0], lvl + 1);
  //     blink2(newStone[1], lvl + 1);
  //   }
  //   return stone;
  // };

  const finalStones: Record<number, number> = {};
  const blink2 = (stone: number, score = 0, lvl = 0) => {
    const newStone = splitStone(stone);
    if (stone in finalStones) {
      finalStones[stone] = score;
      return score;
    }
    if (lvl === 25) {
      newStone.forEach((s) => {
        finalStones[s] = 1;
      });
      return score;
    }
    if (newStone.length === 1) {
      score += blink2(newStone[0], score, lvl + 1);
    } else {
      score += blink2(newStone[0], score, lvl + 1);
      score += blink2(newStone[1], score, lvl + 1);
    }
    return score;
  };

  stones.forEach((stone) => blink2(stone));
  console.log(finalStones);
  return score;
};

const part2 = (rawInput: string) => {
  let stones = parseInput(rawInput);
  // let score = 0;
  const finalStones: Record<number, number> = {};
  const blink2 = (stone: number, score = 0, lvl = 0) => {
    const newStone = splitStone(stone);
    if (stone in finalStones) {
      finalStones[stone] = score;
      return;
    }
    if (lvl === 75) {
      score += 1;
      newStone.forEach((s) => {
        finalStones[s] = 1;
      });
      return stone;
    }
    if (newStone.length === 1) {
      blink2(newStone[0], score + 1, lvl + 1);
    } else {
      blink2(newStone[0], score + 1, lvl + 1);
      blink2(newStone[1], score + 1, lvl + 1);
    }
    return stone;
  };

  // blink2(stones[0]);

  stones.forEach((stone) => blink2(stone));
  const s = Object.values(finalStones).reduce((a, c) => a + c, 0);
  // console.log(Object.entries(finalStones).length);
  // console.log(s);

  // printStone(nodes[0]);

  return 0;
};

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `125 17`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
