"use strict";

// ======
// Part 1
// ======
const part1 = (input) => {
  const lines = parseLines(input);
  let easy = 0;
  for (let line of lines) {
    line = line.split(" | ");
    //console.log(line[1].trim().split(" ").filter( n => [1,4,7,8].includes(n.length)))
    easy += line[1]
      .trim()
      .split(" ")
      .filter((n) => [2, 3, 4, 7].includes(n.length)).length;
  }
  return easy;
};

// ======
// Part 2
// ======
const part2 = (input) => {};

const parseLines = (data) => data.trim().split(String.fromCharCode(10));

module.exports = { part1, part2 };
