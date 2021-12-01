"use strict";

// ======
// Part 1
// ======
const part1 = (input) => {
  const parsed = parseInput(input);

  //   let largerThanPrevious = 0;
  //   for (let i = 0; i < parsed.length; i++) {
  //     console.log(
  //       parsed[i],
  //       parsed[i] > parsed[i - 1] ? "(increased)" : "(decreased)"
  //     );
  //     if (parsed[i] > parsed[i - 1]) {
  //       largerThanPrevious++;
  //     }
  //   }
  // result from for loop was 1120 and incorrect

  const largerThanPrevious = parsed.reduce(
    (p, c, i, a) => p + Number(i > 0 && a[i] > a[i - 1]),
    0
  );
  // reduce gave the right answer :)

  return largerThanPrevious;
};

// ======
// Part 2
// ======
const part2 = (input) => {
  const parsed = parseInput(input);
  const largerThanPrevious = parsed.reduce(
    (p, c, i, a) => p + Number(i > 2 && a[i] > a[i - 3]),
    0
  );

  return largerThanPrevious;
};

const parseInput = (input) => input.split("\n").map((x) => parseInt(x));

module.exports = { part1, part2 };
