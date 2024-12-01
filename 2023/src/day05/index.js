import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const getMaps = (input) => {
  const maps = {};
  input
    .map((l) => l.split("\n"))
    .forEach((m) => {
      const key = m[0].split(" map:")[0];
      maps[key] = {
        ranges: [],
      };
      m.forEach((ml, idx) => {
        if (idx === 0) {
          const [source, dest] = ml.split("-to-");
          maps[key].source = source;
          maps[key].dest = dest.split(" map:")[0];
        } else {
          maps[key].ranges.push(ml.split(" ").map(Number));
        }
      });
    });
  return maps;
};

const part1 = (rawInput) => {
  const lines = parseInput(rawInput).split("\n\n");
  const seeds = lines[0].split(": ")[1].split(" ").map(Number);
  const maps = getMaps(lines.slice(1));

  const getDest = (source, sourceType, destType) => {
    const destMap = maps[`${sourceType}-to-${destType}`];

    const ranges = destMap.ranges;
    let dest = source;
    ranges.forEach((range) => {
      const [destStart, sourceStart, len] = range;
      const sourceMax = sourceStart + len - 1;
      const destMax = destStart + len - 1;
      if (source >= sourceStart && source <= sourceMax) {
        const distSource = sourceMax - source;
        dest = destMax - distSource;
      }
    });
    return dest;
  };

  const getFinalForSeed = (seed) => {
    const _maps = Object.values(maps);
    let source = seed;
    _maps.forEach((map) => {
      source = getDest(source, map.source, map.dest);
    });
    return source;
  };
  const locations = seeds.map((seed) => {
    return getFinalForSeed(seed);
  });
  return Math.min(...locations);
};

const part2 = (rawInput) => {
  const lines = parseInput(rawInput).split("\n\n");
  const seeds = lines[0].split(": ")[1].split(" ").map(Number);
  const maps = getMaps(lines.slice(1));

  const getDest = (source, sourceType, destType) => {
    const destMap = maps[`${sourceType}-to-${destType}`];

    const ranges = destMap.ranges;
    let dest = source;
    ranges.forEach((range) => {
      const [destStart, sourceStart, len] = range;
      const sourceMax = sourceStart + len - 1;
      const destMax = destStart + len - 1;
      if (source >= sourceStart && source <= sourceMax) {
        const distSource = sourceMax - source;
        dest = destMax - distSource;
      }
    });
    return dest;
  };

  const getFinalForSeed = (seed) => {
    const _maps = Object.values(maps);
    let source = seed;
    _maps.forEach((map) => {
      source = getDest(source, map.source, map.dest);
    });
    return source;
  };

  const getSeedChunks = () => {
    var groups = [];
    for (var i = 0; i < seeds.length; i += 2) {
      groups.push(seeds.slice(i, i + 2));
    }
    return groups;
  };

  const seedChunks = getSeedChunks();

  const locations = [];
  seedChunks.forEach(([start, len]) => {
    let i = start;
    while (i < start + len) {
      locations.push(getFinalForSeed(i));
      i++;
    }
  });
  return Math.min(...locations);
};

const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
