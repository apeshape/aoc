var input = "ghijklmn";

// a = 97 z=122
var pass: number[] = [];
for (var i = 0; i < input.length; i++) {
  pass.push(input.charCodeAt(i));
}

while ((pass = increasePass(pass))) {
  if (testPass(pass) === true) break;
}

console.log(
  "Next pass: " +
    String.fromCharCode(
      pass[0],
      pass[1],
      pass[2],
      pass[3],
      pass[4],
      pass[5],
      pass[6],
      pass[7]
    )
);

function increasePass(pass) {
  var i = 7;
  while (true) {
    pass[i] = increaseChar(pass[i]);
    if (pass[i] !== 97 || i === 0) break;
    i--;
  }
  return pass;
}

function increaseChar(char) {
  char++;
  if (char === 123) char = 97;
  if ([105, 108, 111].indexOf(char) > -1) char++;
  return char;
}

function testPass(pass) {
  return testSequence(pass) && testPairs(pass) && testBad(pass);
}

function testBad(pass) {
  for (var i = 0; i < pass.length; i++) {
    if ([105, 108, 111].indexOf(pass[i]) > -1) return false;
  }
  return true;
}

function testSequence(pass) {
  for (var i = 0; i < 6; i++) {
    if (pass[i + 2] - pass[i + 1] === 1 && pass[i + 1] - pass[i] === 1)
      return true;
  }
  return false;
}

function testPairs(pass) {
  var count = 0;
  for (var i = 0; i < 7; i++) {
    if (pass[i] / pass[i + 1] === 1) {
      count++;
      i++;
    }
  }
  if (count >= 2) return true;
  return false;
}
