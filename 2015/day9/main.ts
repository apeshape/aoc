// const data = `London to Dublin = 464
// London to Belfast = 518
// Dublin to Belfast = 141`;

const data = `Faerun to Tristram = 65
Faerun to Tambi = 129
Faerun to Norrath = 144
Faerun to Snowdin = 71
Faerun to Straylight = 137
Faerun to AlphaCentauri = 3
Faerun to Arbre = 149
Tristram to Tambi = 63
Tristram to Norrath = 4
Tristram to Snowdin = 105
Tristram to Straylight = 125
Tristram to AlphaCentauri = 55
Tristram to Arbre = 14
Tambi to Norrath = 68
Tambi to Snowdin = 52
Tambi to Straylight = 65
Tambi to AlphaCentauri = 22
Tambi to Arbre = 143
Norrath to Snowdin = 8
Norrath to Straylight = 23
Norrath to AlphaCentauri = 136
Norrath to Arbre = 115
Snowdin to Straylight = 101
Snowdin to AlphaCentauri = 84
Snowdin to Arbre = 96
Straylight to AlphaCentauri = 107
Straylight to Arbre = 14
AlphaCentauri to Arbre = 46`;

const allCities: string[] = [];

const distances = dataDay13.split("\n").map((l) => {
  const [citiesPart, distance] = l.split(" = ");
  const [cit1, cit2] = citiesPart.split(" to ");
  if (!allCities.includes(cit1)) allCities.push(cit1);
  if (!allCities.includes(cit2)) allCities.push(cit2);
  return [cit1, cit2, Number(distance)];
});

const getDist = (c1: string, c2: string) => {
  return distances.find((v) => {
    if (v[0] === c1 && v[1] === c2) return true;
    if (v[1] === c1 && v[0] === c2) return true;
  })?.[2] as number;
};

let longest = 0;
const longestDists: number[] = [];
const routeCalc = (all, prev = undefined, dist = 0, path = "") => {
  if (all.length === 0) {
    if (dist > longest) {
      longest = dist;
      longestDists.push(longest);
    }
    return;
  }
  all.forEach((c) => {
    const newDist = prev ? getDist(prev, c) : 0;
    routeCalc(
      all.filter((x) => x !== c),
      c,
      dist + newDist,
      `${path} -> ${c}`
    );
  });
};

let shortest = Number.MAX_SAFE_INTEGER;
const shortestDists: number[] = [];
const routeCalc2 = (all, prev = undefined, dist = 0, path = "") => {
  if (all.length === 0) {
    if (dist < shortest) {
      shortest = dist;
      shortestDists.push(shortest);
    }
    return;
  }
  all.forEach((c) => {
    const newDist = prev ? getDist(prev, c) : 0;
    routeCalc2(
      all.filter((x) => x !== c),
      c,
      dist + newDist,
      `${path} -> ${c}`
    );
  });
};

routeCalc([...allCities]);
console.log(Math.max(...longestDists));
routeCalc2([...allCities]);
console.log(Math.min(...shortestDists));
