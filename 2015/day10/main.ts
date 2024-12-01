const test = "hijklmmn";
const alpha = "abcdefghijklmnopqrstuvwxyz".split("");

const testConsecutive = (str: string) => {
  let i = 0;
  while (i < str.length - 3) {
    const testSlice = str.slice(i, i + 3);
    if (alpha.join("").includes(testSlice)) {
      return true;
    }
    i++;
  }
  return false;
};

const testContainsIllegal = (str: string) => {
  if (str.includes("i") || str.includes("o") || str.includes("l")) return false;
  return true;
};

function testDoubles(pass) {
  var count = 0;
  for (var i = 0; i < pass.length - 1; i++) {
    if (pass[i].charCodeAt(0) / pass[i + 1].charCodeAt(0) === 1) {
      count++;
      i++;
    }
  }
  if (count >= 2) return true;
  return false;
}

const incChar = (char: string) => {
  const alphaIdx = alpha.findIndex((i) => i === char);
  const nextChar = alpha[(alphaIdx + 1) % alpha.length];
  if (["i", "l", "o"].includes(nextChar)) return incChar(nextChar);
  return nextChar;
};

const testPwd = (pwd: string) =>
  Boolean(testConsecutive(pwd) && testContainsIllegal(pwd) && testDoubles(pwd));

const rotate = (pwd: string) => {
  const chars = pwd.split("");

  const reversed = [...chars].reverse();

  for (let i = 0; i < reversed.length; i++) {
    const char = reversed[i];
    reversed[i] = incChar(char);
    if (reversed[i] !== "a") break;
  }

  return [...reversed].reverse().join("");
};

let j = 0;
let pwd = test;
while (true) {
  const valid = testPwd(pwd);
  if (valid) {
    console.log("is valid");
    break;
  }
  pwd = rotate(pwd);
  // console.log(pwd);
  j++;
}
console.log({ pwd });
