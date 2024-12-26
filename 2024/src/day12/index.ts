import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split(""));

const printGrid = (grid: string[][]) => grid.forEach((l) => l.map(console.log));

interface Area {
  type?: string;
  points: Set<string>;
}

type Point = [number, number];
type Neighour = {
  value?: string;
  point: Point;
  dir: Point;
};
const getGridValue = (p: Point, grid: string[][]) => {
  return grid[p[1]]?.[p[0]];
};
const getNeighbours = (p: Point, grid: string[][]): Neighour[] => {
  const dirs: Point[] = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];
  const ns: Neighour[] = [];
  dirs.forEach((dir) => {
    const n = getGridValue([p[0] + dir[0], p[1] + dir[1]], grid);
    ns.push({
      value: n,
      point: [p[0] + dir[0], p[1] + dir[1]],
      dir,
    });
  });
  return ns;
};

const isVisited = (visitedArr: Set<string>, point: Point) =>
  visitedArr.has(JSON.stringify(point));

const getAreas = (grid: string[][]) => {
  const areas: Area[] = [];
  const allVisited = new Set<string>();
  const visit = (
    point: Point,
    plotType?: string,
    currentVisited = new Set<string>(),
  ) => {
    if (!plotType) plotType = getGridValue(point, grid);
    const allNeighbours = getNeighbours(point, grid);
    const next = allNeighbours.filter(
      (e) =>
        e.value === plotType &&
        e.value !== undefined &&
        !isVisited(currentVisited, e.point),
    );
    allVisited.add(JSON.stringify(point));
    currentVisited.add(JSON.stringify(point));

    if (next.length === 0) {
      return currentVisited;
    }
    for (let i = 0; i < next.length; i++) {
      visit(next[i].point, plotType, currentVisited);
    }

    return currentVisited;
  };

  grid.forEach((l, y) => {
    l.forEach((plot, x) => {
      if (!isVisited(allVisited, [x, y])) {
        const _plots = visit([x, y]);
        areas.push({
          type: plot,
          points: _plots,
        });
      }
    });
  });

  return areas;
};

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput);
  const areas = getAreas(grid);

  return areas.reduce((a1, area) => {
    const perimiter = [...area.points].reduce(
      (a2, e) =>
        a2 +
        getNeighbours(JSON.parse(e), grid).filter((n) => n.value !== area.type)
          .length,
      0,
    );
    return a1 + perimiter * area.points.size;
  }, 0);
};

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput);
  const areas = getAreas(grid);

  const getSides = (area: Area) => {
    const allNeighbours: Neighour[] = [];

    [...area.points].map((p) => {
      const point = JSON.parse(p);
      const ns = getNeighbours(point, grid).filter(
        (n) => n.value !== area.type,
      );
      ns.forEach((n) => {
        allNeighbours.push(n);
      });
    });
    const wNeighbours = allNeighbours
      .filter((n) => n.dir[0] === -1)
      .sort((a, b) => a.point[1] - b.point[1]);
    const eNeighbours = allNeighbours
      .filter((n) => n.dir[0] === 1)
      .sort((a, b) => a.point[1] - b.point[1]);
    const nNeighbours = allNeighbours
      .filter((n) => n.dir[1] === -1)
      .sort((a, b) => a.point[1] - b.point[1]);
    const sNeighbours = allNeighbours
      .filter((n) => n.dir[1] === 1)
      .sort((a, b) => a.point[1] - b.point[1]);

    const checkDir = (ns: Neighour[], dir: number) => {
      let sides = [];
      let newSide = [];
      for (let i = 0; i < ns.length; i++) {
        const curr = ns[i];
        const next = ns[i + 1];
        newSide.push(curr);
        if (next && Math.abs(next.point[dir] - curr.point[dir]) > 1) {
          sides.push(newSide);
          newSide = [];
        }
        if (next === undefined) {
          sides.push(newSide);
        }
      }
      return sides.length;
    };
    let sides = 0;
    sides += checkDir(wNeighbours, 1);
    sides += checkDir(eNeighbours, 0);
    sides += checkDir(nNeighbours, 1);
    sides += checkDir(sNeighbours, 1);
    // console.log(eNeighbours);

    return sides;
  };

  // areas.forEach((a) => {
  //   const sides = getSides(a);
  //   console.log(a.type, sides, a.points.size * sides);
  // });

  return areas.reduce((acc, area) => {
    const sides = getSides(area);
    console.log(area.type, sides);
    return acc + sides * area.points.size;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 140,
      },
      {
        input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
        expected: 772,
      },
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1930,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      //       {
      //         input: `AAAA
      // BBCD
      // BBCC
      // EEEC`,
      //         expected: 80,
      //       },
      {
        input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
        expected: 436,
      },
      //       {
      //         input: `EEEEE
      // EXXXX
      // EEEEE
      // EXXXX
      // EEEEE`,
      //         expected: 236,
      //       },
      //       {
      //         input: `RRRRIICCFF
      // RRRRIICCCF
      // VVRRRCCFFF
      // VVRCCCJFFF
      // VVVVCJJCFE
      // VVIVCCJJEE
      // VVIIICJJEE
      // MIIIIIJJEE
      // MIIISIJEEE
      // MMMISSJEEE`,
      //         expected: 1206,
      //       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
