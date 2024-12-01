const getPlayer = (stats) => {
  return {
    hp: stats.hp,
    damage: stats.damage,
    armor: stats.armor,
  };
};

const attack = (attacker, target) => {
  target.hp -= attacker.damage - target.armor;
};

const me = getPlayer({ hp: 100, damage: 7, armor: 4 });
const boss = getPlayer({ hp: 109, damage: 8, armor: 2 });

while (true) {
  attack(me, boss);
  attack(boss, me);
  console.log("me", me.hp, "boss", boss.hp);
  if (me.hp <= 0 || boss.hp <= 0) {
    console.log({ me }, { boss });
    break;
  }
}
