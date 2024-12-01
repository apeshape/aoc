const { readFileSync } = require("fs");
const lines = readFileSync("data.txt", "utf-8").trim();
// const lines = "A(1x5)BC".split("");

const decompress = (str) => {
  const getMarkerAt = (start) => {
    let marker = "";
    let j = start;
    while (true) {
      marker += str[j];
      if (str[j] === ")") {
        break;
      }
      j++;
    }
    return marker;
  };

  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === "(") {
      const marker = getMarkerAt(i);
      str.splice(i, marker.length); // Delete marker
      const [size, repeats] = marker.match(/\d+/g).map(Number);
      const repeatPart = str.slice(i, i + size);
      let repeated = "";
      for (let j = 0; j < repeats - 1; j++) {
        repeated += repeatPart.join("");
      }
      str.splice(i, 0, ...repeated.split(""));
      i += size + repeated.length - 1;
    }
  }

  return str.join("");
};

const part1 = () => {
  // const tests = [
  //   "ADVENT",
  //   "A(1x5)BC",
  //   "(3x3)XYZ",
  //   "A(2x2)BCD(2x2)EFG",
  //   "(6x1)(1x3)A",
  //   "X(8x2)(3x3)ABCY",
  //   "(19x14)(3x2)ZTN(5x14)MBPWH",
  // ].forEach((l) => {
  //   console.log(decompress(l.split("")).length);
  // });
  console.log(decompress(lines.split("")).length);
};

const part2 = () => {
  let score = 0;
  const decompress2 = (str) => {
    const getMarker = (s) => {
      return s
        .match(/\((\d+)x(\d+)\)/)
        .map((x) => (!x.startsWith("(") ? Number(x) : x));
    };

    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (c === "(") {
        const [marker, size, repeats] = getMarker(str.substring(i));
        const nextStr = str.substring(
          i + marker.length,
          i + marker.length + size
        );
        for (var j = 0; j < repeats; j++) {
          decompress2(nextStr);
        }

        i += marker.length + size - 1;
      } else {
        score += 1;
      }
    }
  };
  const tests = [
    // "ADVENT",
    // "A(1x5)BC",
    // "X(8x2)(3x3)ABCY",
    // "(19x14)(3x2)ZTN(5x14)MBPWH",
    // "(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN",
    // "(27x12)(20x12)(13x14)(7x10)(1x12)A",
    // "(3x3)XYZ",
    // "X(8x2)(3x3)ABCY",
    lines,
  ];

  tests.forEach((test) => {
    score = 0;
    console.time("decompress");
    decompress2(test);
    console.timeEnd("decompress");
    console.log(score);
  });
};

part1();
part2();
