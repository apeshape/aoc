const inp2 =
  `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`.split(
    "\n"
  );

const inp2_real =
  `Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds.
Rudolph can fly 3 km/s for 15 seconds, but then must rest for 28 seconds.
Donner can fly 19 km/s for 9 seconds, but then must rest for 164 seconds.
Blitzen can fly 19 km/s for 9 seconds, but then must rest for 158 seconds.
Comet can fly 13 km/s for 7 seconds, but then must rest for 82 seconds.
Cupid can fly 25 km/s for 6 seconds, but then must rest for 145 seconds.
Dasher can fly 14 km/s for 3 seconds, but then must rest for 38 seconds.
Dancer can fly 3 km/s for 16 seconds, but then must rest for 37 seconds.
Prancer can fly 25 km/s for 6 seconds, but then must rest for 143 seconds.`.split(
    "\n"
  );

const partOne = () => {
  inp2_real.forEach((l) => {
    const match =
      /^([a-z]+) can fly ([0-9]+) km\/s for ([0-9]+) seconds, but then must rest for ([0-9]+) seconds\.$/i.exec(
        l
      );
    const name = match![1];
    const dist = Number(match![2]);
    const time = Number(match![3]);
    const restTime = Number(match![4]);

    let totalDist = 0;
    let seconds = 0;
    while (seconds < 2503) {
      if (seconds % (time + restTime) < time) {
        totalDist += dist;
      }
      seconds++;
    }
    console.log(name, dist, time, restTime, totalDist);
  });
};
// partOne();

const partTwo = () => {
  const rd = {};
  const getLeaders = () => {
    const sorted = Object.entries(rd)
      .sort(([ak, av]: any, [bk, bv]: any) => {
        return bv.dist - av.dist;
      })
      .map(([k, v]: any) => {
        return {
          name: k,
          ...v,
        };
      });
    return sorted.filter((s) => s.dist === sorted[0].dist).map((s) => s.name);
  };
  inp2_real.forEach((l) => {
    const match =
      /^([a-z]+) can fly ([0-9]+) km\/s for ([0-9]+) seconds, but then must rest for ([0-9]+) seconds\.$/i.exec(
        l
      );

    const name = match![1];
    const pace = Number(match![2]);
    const time = Number(match![3]);
    const restTime = Number(match![4]);
    rd[name] = { dist: 0, points: 0, pace, time, restTime };
  });

  let seconds = 0;
  while (seconds < 2503) {
    Object.entries(rd).forEach(([k, v]: any) => {
      if (seconds % (v.time + v.restTime) < v.time) {
        rd[k].dist += v.pace;
      }
    });
    seconds++;
    const leaders = getLeaders();
    leaders.forEach((l) => (rd[l].points += 1));
  }

  console.log(rd);
};
partTwo();
