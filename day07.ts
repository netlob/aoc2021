"use strict";

// ======
// Part 1
// ======
const part1 = (input) => {
  const crabs = parseInput(input);

  const min = Math.min(...crabs);
  const max = Math.max(...crabs);
  let best = 1 / 0;
  for (let alignTo = min; alignTo <= max; alignTo++) {
    let actual = 0;
    for (const crab of crabs) {
      actual += Math.abs(alignTo - crab);
    }
    if (actual < best) best = actual;
  }
  return best;
};

// ======
// Part 2
// ======
const part2 = (input) => {
  const crabs = parseInput(input);

  const min = Math.min(...crabs);
  const max = Math.max(...crabs);
  const distances = [0];
  for (let i = 1; i < max; i++) {
    distances.push(distances[i - 1] + i);
  }
  let best = 1 / 0;
  for (let alignTo = min; alignTo <= max; alignTo++) {
    let actual = 0;
    for (const crab of crabs) {
      actual += distances[Math.abs(alignTo - crab)];
    }
    if (actual < best) best = actual;
  }
  return best;
};

const parseInput = (input) => input.trim().split(",").map(Number);

module.exports = { part1, part2 };
