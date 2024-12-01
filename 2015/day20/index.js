// const targetPresents = 36000000;

const targetPresents = 360;

const partOne = () => {
  let i = 0;
  let house = 0;
  console.time("Elves, go!");
  while (true) {
    house = i + 1;
    let numPresents = 0;
    for (let e = 0; e < house; e++) {
      const elf = e + 1;
      if (house % elf === 0) {
        numPresents += elf * 10;
      }
    }
    // console.log("House", house, numPresents);
    if (numPresents >= targetPresents) {
      console.log("House", house, numPresents);
      console.timeEnd("Elves, go!");
      break;
    }
    if (i % 100000 === 0) {
      console.log({ numPresents });
    }
    i++;
  }
};
const partTwo = () => {
  let i = 0;
  let house = 0;
  console.time("Elves, go!");
  while (true) {
    house = i + 1;
    let numPresents = 0;
    for (let e = 0; e < house; e++) {
      const elf = e + 1;
      if (house % elf === 0) {
        numPresents += elf * 10;
      }
    }
    // console.log("House", house, numPresents);
    if (numPresents >= targetPresents) {
      console.log("House", house, numPresents);
      console.timeEnd("Elves, go!");
      break;
    }
    if (i % 100000 === 0) {
      console.log({ numPresents });
    }
    i++;
  }
};
