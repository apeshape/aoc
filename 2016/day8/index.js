const { readFileSync } = require("fs");
const lines = readFileSync("data.txt", "utf-8").trim().split("\n");

const gridSize = [50, 6];
// const gridSize = [7, 3];

const grid = [];
for (let y = 0; y < gridSize[1]; y++) {
  const row = [];
  grid.push(row);
  for (let x = 0; x < gridSize[0]; x++) {
    row.push(".");
  }
}

const operations = {
  rect: (x, y) => {
    for (let _y = 0; _y < y; _y++) {
      for (let _x = 0; _x < x; _x++) {
        grid[_y][_x] = "#";
      }
    }
  },
  rotateCol: (col, by) => {
    const column = grid.map((l) => l[col]);
    console.log(column);
    const newColumn = [];
    column.forEach((c, idx) => {
      return (newColumn[(idx + by) % column.length] = c);
    });
    grid.forEach((l, idx) => {
      l[col] = newColumn[idx];
    });
  },
  rotateRow: (row, by) => {
    const r = [...grid[row]];
    const newRow = [];
    r.forEach((c, idx) => {
      return (newRow[(idx + by) % r.length] = c);
    });

    grid[row] = newRow;
  },
};

const printGrid = () => {
  console.log("====-- grid --====");
  grid.forEach((l) => {
    console.log(l.join(""));
  });
};

console.log(lines);

lines.forEach((l) => {
  const parts = l.split(" ");
  const op = parts[0];
  if (op === "rect") {
    const [x, y] = parts[1].split("x").map(Number);
    operations.rect(x, y);
  }
  if (op === "rotate") {
    const pos = Number(parts[2].split("=")[1]);
    const by = Number(parts[4]);
    if (parts[1] === "column") {
      operations.rotateCol(pos, by);
    } else {
      operations.rotateRow(pos, by);
    }
  }
});

printGrid(grid);

const on = grid.reduce(
  (acc, cur) => acc + cur.reduce((a, c) => (c === "#" ? a + 1 : a), 0),
  0
);

console.log({ on });

// operations.rect(3, 2);
// printGrid(grid);
// operations.rotateCol(1, 1);
// printGrid(grid);
// operations.rotateRow(0, 4);
// printGrid(grid);
// operations.rotateCol(1, 1);
// printGrid(grid);
