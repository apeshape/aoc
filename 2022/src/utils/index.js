/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.js,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ fro 'lodash
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ fro 'lodash
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 */
import readline from "readline";

export const sumList = (arrOfInts) => {
  return arrOfInts.reduce((ac, cur) => ac + cur, 0);
};

export const intersects = (set1, set2) => {
  const intersects = new Set([...set1].filter((x) => set2.has(x)));
  return [...intersects];
};

export const inRange = (num, num1, num2) =>
  Math.min(num1, num2) <= num && Math.max(num1, num2) >= num;

export const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    }),
  );
};
