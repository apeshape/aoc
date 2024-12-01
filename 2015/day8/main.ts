const testData = String.raw`"""abc""aaa\"aaa""\x27"`.trim();

const d = `""
"abc"
"aaa\"aaa"
"\x27"`;

d.split("\n").forEach((l) => {
  console.log(l.length);
  console.log(eval(l).length);
});

console.log(String.raw({ raw: `"aaa\"aaa"` }));
console.log(String.raw`"aaa\"aaa"`);
