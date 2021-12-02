"use strict";

// ======
// Part 1
// ======
const part1 = (input) =>
  input
    .split("\n")
    .map((l) => [l.split(" ")[0], parseInt(l.split(" ")[1])])
    .reduce(
      ([x, y], [m, c]) => [
        (m == "up" && (x -= c)) || (m == "down" && (x += c)) || x,
        (m == "forward" && (y += c)) || y,
      ],
      [0, 0]
    )
    .reduce((p, c) => p * c, 1);

// ======
// Part 2
// ======
const part2 = (input) =>
  input
    .split("\n")
    .map((l) => [l.split(" ")[0], parseInt(l.split(" ")[1])])
    .reduce(
      ([x, y, a], [m, c]) => [
        (m == "forward" && (x += c)) || x,
        (m == "forward" && (y += a * c)) || y,
        (m == "up" && (a -= c)) || (m == "down" && (a += c)) || a,
      ],
      [0, 0, 0]
    )
    .slice(0, 2)
    .reduce((p, c) => p * c, 1);

module.exports = { part1, part2 };
