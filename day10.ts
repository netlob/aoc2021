"use strict";

class Line {
  line: string;

  constructor(line) {
    this.line = line;
  }

  isCorrupted() {
    const reduce = this.reduce();
    const regex = /<}|\[}|\(}|<]|{]|\(]|<\)|{\)|\[\)|\(>|{>|\[>/g;
    return regex.test(reduce);
  }

  getFirstIllegalCharacter() {
    const reduce = this.reduce().split("");
    const regex = /[>}\])]/g;
    for (let i = 0; i < reduce.length; i++) {
      if (regex.test(reduce[i])) {
        return reduce[i];
      }
    }
  }

  reduce() {
    const regex = /<>|\[]|{}|\(\)/g;
    let reducedLine = this.line;
    while (this.line !== "" && regex.test(reducedLine)) {
      reducedLine = reducedLine.replace(regex, "");
    }
    return reducedLine;
  }

  isIncomplete() {
    return this.reduce() !== "" && !this.isCorrupted();
  }

  getCompletion() {
    return this.reduce()
      .split("")
      .reverse()
      .map((char) => {
        if (char === "{") {
          return "}";
        } else if (char === "[") {
          return "]";
        } else if (char === "(") {
          return ")";
        } else if (char === "<") {
          return ">";
        }
      })
      .join("");
  }
}

// ======
// Part 1
// ======
const day10part1 = (input) => {
  const lines = parseLines(input);
  const corruptedLines = lines.filter((line) => line.isCorrupted());
  const illegalCharacters = corruptedLines.map((line) =>
    line.getFirstIllegalCharacter()
  );
  const illegalCharacterValue = new Map();
  illegalCharacterValue.set(")", 3);
  illegalCharacterValue.set("]", 57);
  illegalCharacterValue.set("}", 1197);
  illegalCharacterValue.set(">", 25137);

  const illegalCharactersValues = illegalCharacters.map((char) =>
    illegalCharacterValue.get(char)
  );

  return illegalCharactersValues.reduce((p, c) => p + c, 0);
};

// ======
// Part 2
// ======
const day10part2 = (input) => {
  const lines = parseLines(input);
  const completions = lines
    .filter((line) => line.isIncomplete())
    .map((line) => line.getCompletion());
  const scores = completions
    .map((completion) =>
      completion
        .split("")
        .map((char) => {
          if (char === ")") {
            return 1;
          } else if (char === "]") {
            return 2;
          } else if (char === "}") {
            return 3;
          } else if (char === ">") {
            return 4;
          }
        })
        .reduce((acc, value) => {
          return acc * 5 + value;
        }, 0)
    )
    .sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
};

const parseLines = (input): Line[] =>
  input
    .trim()
    .split("\n")
    .map((line) => new Line(line));

module.exports = { part1: day10part1, part2: day10part2 };
