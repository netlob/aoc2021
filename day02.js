"use strict";

// ======
// Part 1
// ======
const part1 = (input) => {
  const parsed = parseInput(input);

  let x = 0,
    y = 0;

  for (let i = 0; i < parsed.length; i++) {
    const { move, count } = parsed[i];
    switch (move) {
      case "up":
        x -= count;
        break;
      case "down":
        x += count;
        break;
      case "forward":
        y += count;
        break;
      default:
        console.log("fuck");
    }
  }

  return x * y;
};

// ======
// Part 2
// ======
const part2 = (input) => {
  const parsed = parseInput(input);

  let x = 0,
    y = 0,
    aim = 0;

  for (let i = 0; i < parsed.length; i++) {
    const { move, count } = parsed[i];
    if (move == "up") {
      aim -= count;
    } else if (move == "down") {
      aim += count;
    } else if (move == "forward") {
      x += count;
      y += aim * count;
    }
  }

  return x * y;
};

const parseInput = (input) =>
  input.split("\n").map((x) => {
    return {
      move: x.split(" ")[0],
      count: parseInt(x.split(" ")[1]),
    };
  });

module.exports = { part1, part2 };
