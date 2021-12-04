"use strict";

// ======
// Part 1
// ======
const part1 = (input) => {
  const parsed = parseInput(input);
  const draws = parseDraws(parsed);
  const boards = parseBoards(parsed);

  let numbers = [],
    i = 0;

  do {
    numbers.push(draws[i++]);
    for (let b = 0; b < boards.length / 5; b++) {
      if (isValidBoard(b, numbers, boards)) {
        return getUnmatched(b, numbers, boards) * numbers[numbers.length - 1];
      }
    }
  } while (true);
};

// ======
// Part 2
// ======
const part2 = (input) => {
  const parsed = parseInput(input);
  const draws = parseDraws(parsed);
  const boards = parseBoards(parsed);

  let numbers = [],
    i = 0,
    boardsWin = [];

  do {
    numbers.push(draws[i++]);
    for (let b = 0; b < boards.length / 5; b++) {
      if (isValidBoard(b, numbers, boards)) {
        if (boardsWin.includes(b)) {
          continue;
        }

        boardsWin.push(b);

        if (boardsWin.length == boards.length / 5) {
          return getUnmatched(b, numbers, boards) * numbers[numbers.length - 1];
        }
      }
    }
  } while (true);
};

const parseInput = (input) => input.split("\n");
const parseDraws = (parsed) =>
  parsed[0]
    .split(",")
    .map((e) => e.trim())
    .filter((e) => e)
    .map((e) => parseInt(e));
const parseBoards = (parsed) =>
  parsed
    .slice(1)
    .map((e) => e.trim())
    .filter((e) => e.length > 0)
    .map((e) =>
      e
        .split(" ")
        .filter((e) => e)
        .map((e) => parseInt(e.trim()))
    );

const getUnmatched = (board, numbers, boards) => {
  let sum = 0;
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      if (!numbers.includes(boards[board * 5 + x][y])) {
        sum += boards[board * 5 + x][y];
      }
    }
  }
  return sum;
};

const isValidBoard = (board, numbers, boards) => {
  for (let x = 0; x < 5; x++) {
    let contains = true;
    for (let y = 0; y < 5; y++) {
      if (!numbers.includes(boards[board * 5 + x][y])) {
        contains = false;
        break;
      }
    }

    if (contains) {
      return true;
    }
  }

  for (let y = 0; y < 5; y++) {
    let contains = true;
    for (let x = 0; x < 5; x++) {
      if (!numbers.includes(boards[board * 5 + x][y])) {
        contains = false;
        break;
      }
    }

    if (contains) {
      return true;
    }
  }
};

module.exports = { part1, part2 };
