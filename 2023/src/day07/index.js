import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((row) => row.split(" "));

const cards = "AKQJT98765432".split("").reverse();
const types = [5, 4, [3, 2], 3, [2, 2], 2];
const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  // console.log({ input });

  // const getHand = (hand) => {
  //   cards.forEach((c) => {
  //     if (hand.includes(c)) {
  //       console.log(c);
  //     }
  //   });
  // };

  // getHand("AAJJ3");

  // const getHand = (hand) => {
  //   const c = hand.split("").reduce((a, c) => {
  //     if (!a[c]) {
  //       a[c] = 1;
  //       return a;
  //     }
  //     a[c] += 1;
  //     return a;
  //   }, {});

  //   for (const type of types) {
  //     for (const count of Object.values(c)) {
  //       if (count === type) {
  //         return types.length - types.indexOf(type);
  //       }
  //       if (Array.isArray(type)) {
  //         const topTwo = JSON.stringify(
  //           Object.values(c)
  //             .sort((a, b) => b - a)
  //             .slice(0, 2),
  //         );
  //         if (topTwo === JSON.stringify([2, 2])) {
  //           return types.length - 4;
  //         }
  //         if (topTwo === JSON.stringify([3, 2])) {
  //           return types.length - 2;
  //         }
  //       }
  //     }
  //   }
  //   return -1;
  // };
  // const getHighcard = (handa, handb) => {
  //   let highest = 0;
  //   const handaCards = handa.split("");
  //   const handbCards = handb.split("");
  //   for (const carda of handaCards) {
  //     for (const cardb of handbCards) {
  //       if (carda !== cardb) {
  //         return cards.indexOf(carda) - cards.indexOf(cardb);
  //       }
  //     }
  //   }

  //   return highest;
  // };

  // const sorted = input.sort(([handa], [handb]) => {
  //   if (Math.abs(getHand(handa) - getHand(handb)) > 0) {
  //     return getHand(handa) - getHand(handb);
  //   }
  //   const hc = getHighcard(handb, handa);
  //   return hc * -1;
  // });

  // console.log(sorted.slice(-20));

  // return sorted.reduce((acc, c, idx) => {
  //   const bid = c[1];
  //   return (acc += bid * (idx + 1));
  // }, 0);
};

const input = `32T3K 765
T55J5 684
KK677 28
QQ113 45
KTJJT 220
QQQJA 483`;

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
