"use strict";

// ======
// Part 1
// ======
const part1 = (input) => {
  const lines = parseLines(input);

  const scores: { [key: string]: number } = {};

  lines.forEach((line) => {
    if (line.dx != 0 && line.dy !== 0) return;
    line.points.forEach((p) => {
      if (!scores[p]) {
        scores[p] = 1;
      } else {
        scores[p] += 1;
      }
    });
  });

  return Object.values(scores).filter((s) => s >= 2).length;
};

// ======
// Part 2
// ======
const part2 = (input) => {
  const lines = parseLines(input);

  const scores: { [key: string]: number } = {};

  lines.forEach((line) => {
    line.points.forEach((p) => {
      if (!scores[p]) {
        scores[p] = 1;
      } else {
        scores[p] += 1;
      }
    });
  });

  return Object.values(scores).filter((s) => s >= 2).length;
};

const parseLines = (
  input
): {
  dx: number;
  dy: number;
  points: string[];
}[] =>
  input
    .trim()
    .split("\n")
    .map((line) => {
      const [[x1, y1], [x2, y2]] = line
        .split(" -> ")
        .map((p) => p.split(",").map(Number));
      const d = gcd(Math.abs(x2 - x1), Math.abs(y2 - y1));
      const dx = (x2 - x1) / d;
      const dy = (y2 - y1) / d;
      const points: string[] = [];
      let x = x1,
        y = y1;
      while (true) {
        points.push([x, y].join(","));
        if (x === x2 && y === y2) break;
        x += dx;
        y += dy;
      }
      return { dx, dy, points };
    });

const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));

module.exports = { part1, part2 };
