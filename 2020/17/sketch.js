// input = `
// .#.
// ..#
// ###
// `;
input = `
#....#.#
..##.##.
#..#..#.
.#..#..#
.#..#...
##.#####
#..#..#.
##.##..#
`;
space = [16, 16, 16];
currentBoxes = [];
allBoxes = [];
boxSize = 10;
checkBoxes = [];

const vectorInMap = (vec) => {
  const isIn = currentBoxes.some((cb) => cb.dist(vec) === 0);
  return isIn;
};

const getBoundaries = () => {
  b_max = currentBoxes[0].copy();
  b_min = currentBoxes[0].copy();
  currentBoxes.forEach((cb) => {
    if (cb.x < b_min.x) {
      b_min.x = cb.x;
    }
    if (cb.y < b_min.y) {
      b_min.y = cb.y;
    }
    if (cb.z < b_min.z) {
      b_min.z = cb.z;
    }
    if (cb.x > b_max.x) {
      b_max.x = cb.x;
    }
    if (cb.y > b_max.y) {
      b_max.y = cb.y;
    }
    if (cb.z > b_max.z) {
      b_max.z = cb.z;
    }
  });
  return [b_min, b_max];
};

const createEmptyBoxes = () => {
  boxes = [];
  print(currentBoxes);
  const [b_min, b_max] = getBoundaries();
  print(b_min, b_max);
  let x = b_min.x - 1;
  while (x < b_max.x + 2) {
    y = b_min.y - 1;
    while (y < b_max.y + 2) {
      z = b_min.z - 1;
      while (z < b_max.z + 2) {
        const vec = createVector(x, y, z);
        boxes.push({
          active: vectorInMap(vec),
          isTesting: false,
          vec,
        });
        z++;
      }
      y++;
    }
    x++;
  }
  return boxes;
};

const margin = 1;
const drawBox = (vec) => {
  push();
  translate(
    vec.x * boxSize + margin,
    vec.y * boxSize + margin,
    vec.z * boxSize + margin
  );
  strokeWeight(0.2);
  box(boxSize);
  pop();
};

const drawBoxes = () => {
  strokeWeight(0.1);
  allBoxes.forEach((b) => {
    if (b.active) {
      normalMaterial();
      drawBox(b.vec);
    } else if (b.isTesting) {
      fill("rgba(255,0,0, 0.5)");
      drawBox(b.vec);
    } else {
      noFill();
      stroke("rbga(0,255,0,.5)");
      drawBox(b.vec);
    }
    // drawBox(b.vec);
  });
};

const drawCheckBoxes = () => {
  checkBoxes.forEach((v) => {
    fill("rgba(238,216,61,.2)");
    drawBox(v);
  });
};

const testBox = (tb) => {
  aLabel.elt.innerText = `box: x:${tb.vec.x}, y: ${tb.vec.y}, z: ${tb.vec.z}`;

  allBoxes.forEach((b) => {
    b.isTesting = false;
  });

  tb.isTesting = true;

  boxesToCheck = [];
  checkBoxesCount = 0;
  nbc = 0;
  x = tb.vec.x - 1;
  while (x < tb.vec.x + 2) {
    y = tb.vec.y - 1;
    while (y < tb.vec.y + 2) {
      z = tb.vec.z - 1;
      while (z < tb.vec.z + 2) {
        testVec = createVector(x, y, z);
        if (testVec.dist(tb.vec) != 0) {
          allBoxes.forEach((b) => {
            if (b.vec.dist(testVec) == 0 && b.active) {
              nbc++;
            }
          });
          boxesToCheck.push(testVec);
          checkBoxesCount++;
        }
        z++;
      }
      y++;
    }
    x++;
  }
  checkBoxes = boxesToCheck;

  if (tb.active && nbc > 1 && nbc < 4) {
    return tb.vec;
  }
  if (!tb.active && nbc === 3) {
    return tb.vec;
  }
  return false;
};

const testBoxes = () => {
  const newBoxes = [];
  allBoxes.forEach((b) => {
    const newBox = testBox(b);
    if (newBox) {
      newBoxes.push(newBox.copy());
    }
  });
  currentBoxes = newBoxes;
  allBoxes = createEmptyBoxes();
  drawBoxes();
};

let aLabel;
function setup() {
  createCanvas(710, 400, WEBGL);
  inputLines = input.split("\n").filter((l) => l != "");
  inputLines.forEach((l, y) => {
    l.split("").forEach((c, x) => {
      if (c === "#") {
        const vec = createVector(x + 2, y + 1, 2);
        currentBoxes.push(vec);
      }
    });
  });
  aLabel = createP("Testing");
  print("Current boxes", currentBoxes);
  allBoxes = createEmptyBoxes();
}

let tests = 0;
const quickTest = () => {
  // QUICK TESTING:::

  while (tests < 6) {
    testBoxes();
    print("Test ", tests, currentBoxes.length);
    tests++;
  }
  // if (frameCount % 60 === 0) {
  //   testBoxes();
  //   if (frameCount % (60 * 6) === 0) {
  //     print("6 cycles", currentBoxes.length);
  //     noLoop();
  //   }
  //   // noLoop();
  // }
};

let testingBox = 0;
let newCurrentBoxes = [];
loops = 0;
const visualTest = () => {
  if (frameCount % 1 === 0) {
    newBox = testBox(allBoxes[testingBox]);
    if (newBox) {
      newCurrentBoxes.push(newBox.copy());
    }
    if (testingBox < allBoxes.length - 1) {
      testingBox += 1;
    } else {
      print("FLUSH", newCurrentBoxes);
      currentBoxes = newCurrentBoxes;
      allBoxes = createEmptyBoxes();

      drawBoxes();
      print(currentBoxes);
      if (loops == 6) {
        print("NO MORE!", currentBoxes.length);
        noLoop();
      }
      testingBox = 0;
      loops += 1;
    }
  }
};

function draw() {
  background(52);
  orbitControl(2, 2, 0.1);
  ambientLight("rgba(200,12,140,0.4)");
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  directionalLight(250, 250, 250, -dirX, -dirY, -1);

  drawBoxes();
  // drawCheckBoxes();

  // visualTest();
  // noLoop();
  quickTest();
}
