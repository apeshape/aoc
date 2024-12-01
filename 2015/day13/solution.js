var str = `Alice would gain 2 happiness units by sitting next to Bob.
Alice would gain 26 happiness units by sitting next to Carol.
Alice would lose 82 happiness units by sitting next to David.
Alice would lose 75 happiness units by sitting next to Eric.
Alice would gain 42 happiness units by sitting next to Frank.
Alice would gain 38 happiness units by sitting next to George.
Alice would gain 39 happiness units by sitting next to Mallory.
Bob would gain 40 happiness units by sitting next to Alice.
Bob would lose 61 happiness units by sitting next to Carol.
Bob would lose 15 happiness units by sitting next to David.
Bob would gain 63 happiness units by sitting next to Eric.
Bob would gain 41 happiness units by sitting next to Frank.
Bob would gain 30 happiness units by sitting next to George.
Bob would gain 87 happiness units by sitting next to Mallory.
Carol would lose 35 happiness units by sitting next to Alice.
Carol would lose 99 happiness units by sitting next to Bob.
Carol would lose 51 happiness units by sitting next to David.
Carol would gain 95 happiness units by sitting next to Eric.
Carol would gain 90 happiness units by sitting next to Frank.
Carol would lose 16 happiness units by sitting next to George.
Carol would gain 94 happiness units by sitting next to Mallory.
David would gain 36 happiness units by sitting next to Alice.
David would lose 18 happiness units by sitting next to Bob.
David would lose 65 happiness units by sitting next to Carol.
David would lose 18 happiness units by sitting next to Eric.
David would lose 22 happiness units by sitting next to Frank.
David would gain 2 happiness units by sitting next to George.
David would gain 42 happiness units by sitting next to Mallory.
Eric would lose 65 happiness units by sitting next to Alice.
Eric would gain 24 happiness units by sitting next to Bob.
Eric would gain 100 happiness units by sitting next to Carol.
Eric would gain 51 happiness units by sitting next to David.
Eric would gain 21 happiness units by sitting next to Frank.
Eric would gain 55 happiness units by sitting next to George.
Eric would lose 44 happiness units by sitting next to Mallory.
Frank would lose 48 happiness units by sitting next to Alice.
Frank would gain 91 happiness units by sitting next to Bob.
Frank would gain 8 happiness units by sitting next to Carol.
Frank would lose 66 happiness units by sitting next to David.
Frank would gain 97 happiness units by sitting next to Eric.
Frank would lose 9 happiness units by sitting next to George.
Frank would lose 92 happiness units by sitting next to Mallory.
George would lose 44 happiness units by sitting next to Alice.
George would lose 25 happiness units by sitting next to Bob.
George would gain 17 happiness units by sitting next to Carol.
George would gain 92 happiness units by sitting next to David.
George would lose 92 happiness units by sitting next to Eric.
George would gain 18 happiness units by sitting next to Frank.
George would gain 97 happiness units by sitting next to Mallory.
Mallory would gain 92 happiness units by sitting next to Alice.
Mallory would lose 96 happiness units by sitting next to Bob.
Mallory would lose 51 happiness units by sitting next to Carol.
Mallory would lose 81 happiness units by sitting next to David.
Mallory would gain 31 happiness units by sitting next to Eric.
Mallory would lose 73 happiness units by sitting next to Frank.
Mallory would lose 89 happiness units by sitting next to George.`;

// From http://stackoverflow.com/a/20871714
function permutator(n) {
  function t(n, r) {
    for (var e, r = r || [], o = 0; o < n.length; o++)
      (e = n.splice(o, 1)),
        0 === n.length && c.push(r.concat(e)),
        t(n.slice(), r.concat(e)),
        n.splice(o, 0, e[0]);
    return c;
  }
  var c = [];
  return t(n);
}

function calculateHappiness(order) {
  var totalHappinessChange = 0;

  for (var i = 0; i < order.length; i++) {
    var person = order[i];
    var before = order[(i - 1 + order.length) % order.length];
    var after = order[(i + 1) % order.length];

    if (person !== "me" && before !== "me")
      totalHappinessChange += happiness[person][before];
    if (person !== "me" && after !== "me")
      totalHappinessChange += happiness[person][after];
  }

  return totalHappinessChange;
}

function calculateBestHappiness(withMe) {
  var bestHappinessChange = -Infinity;
  console.log(permutator(names).length);

  permutator(names).forEach(function (order, i) {
    bestHappinessChange = Math.max(
      bestHappinessChange,
      calculateHappiness(order)
    );
  });
  return bestHappinessChange;
}

// Set up arrays
var happiness = {};
var names = [];

str.split("\n").forEach(function (line) {
  var match =
    /^([a-z]+) would (lose|gain) ([0-9]+) happiness units by sitting next to ([a-z]+)\.$/i.exec(
      line
    );
  if (names.indexOf(match[1]) === -1) names.push(match[1]);
  if (!(match[1] in happiness)) happiness[match[1]] = {};
  happiness[match[1]][match[4]] = (match[2] === "lose" ? -1 : 1) * match[3];
});

console.log(names, happiness);

console.log("Part One: ", calculateBestHappiness());
// names.push('me');
// console.log('Part Two: ', calculateBestHappiness());
