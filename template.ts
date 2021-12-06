"use strict";

// ======
// Part 1
// ======
const part1 = (input) => {
  const lines = parseLines(input);

  return parseInput;
};

// ======
// Part 2
// ======
const part2 = (input) => {
  const lines = parseInput(input);

  return lines;
};

const parseInput = (input) =>
  input
    .trim()
    .split("\n")
    .map((line) => line);

module.exports = { part1, part2 };
