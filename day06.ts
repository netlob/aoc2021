"use strict";

// ======
// Part 1
// ======
const part1 = (input) => {
  console.time("part1");
  const fishes = parseInput(input);

  let days = 80;
  let makingFishes = new Array(8).fill(0);
  fishes.forEach((f) => (makingFishes[f] = makingFishes[f] + 1 || 1));
  let total = 0;
  for (let i = 0; i < days; i++) {
    if (i in makingFishes) {
      const newFish = makingFishes[i];
      makingFishes[i + 7] = makingFishes[i + 7] + newFish || newFish;
      makingFishes[i + 9] = makingFishes[i + 9] + newFish || newFish;
      if (i + 7 >= days) total += newFish;
      if (i + 9 >= days) total += newFish;
    }
  }

  console.timeEnd("part1");
  return total;
};

// ======
// Part 2
// ======
const part2 = (input) => {
  console.time("part2");
  const fishes = parseInput(input);

  let days = 256;
  let makingFishes = [0];
  fishes.forEach((f) => (makingFishes[f] = makingFishes[f] + 1 || 1));
  let total = 0;
  for (let i = 0; i < days; i++) {
    if (i in makingFishes) {
      const newFish = makingFishes[i];
      makingFishes[i + 7] = makingFishes[i + 7] + newFish || newFish;
      makingFishes[i + 9] = makingFishes[i + 9] + newFish || newFish;
      if (i + 7 >= days) total += newFish;
      if (i + 9 >= days) total += newFish;
    }
  }

  console.timeEnd("part2");
  return total;
};

const parseInput = (input) => input.trim().split(",").map(Number);

module.exports = { part1, part2 };
