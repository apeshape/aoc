import { hash } from "node:crypto";

const doorId = "ffykfhsq";

const part1 = () => {
  console.time("password");
  let pass = "";
  let i = 0;
  while (true) {
    const toTest = `${doorId}${i}`;
    const result = hash("md5", toTest, "hex");
    if (result.startsWith("00000")) {
      const character = result[5];
      pass += character;
      if (pass.length === 8) {
        console.timeEnd("password");
        break;
      }
    }
    i++;
  }

  console.log({ pass });
};

const part2 = () => {
  console.time("password part2");
  const password = [];
  let i = 0;
  while (true) {
    const toTest = `${doorId}${i}`;
    const result = hash("md5", toTest, "hex");
    if (result.startsWith("00000")) {
      const position = result[5];
      const character = result[6];

      const posNum = position.match(/\d/)?.[0];
      if (posNum && posNum >= 0 && posNum < 8) {
        if (!password[posNum]) {
          password[posNum] = character;
        }
        if (password.filter(Boolean).length === 8) {
          console.timeEnd("password part2");
          console.log(password.join(""));
          break;
        }
      }
    }
    i++;
  }
};

part1();
part2();
