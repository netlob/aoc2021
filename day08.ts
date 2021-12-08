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
const part2 = (input) => {
  const lines = parseLines(input);
  const data = lines.map((line) =>
    line.split(" | ").map((hl) => hl.trim().split(" "))
  );
  let sum = 0;

  const mapping = {
    abcefg: "0",
    cf: "1",
    acdeg: "2",
    acdfg: "3",
    bcdf: "4",
    abdfg: "5",
    abdefg: "6",
    acf: "7",
    abcdefg: "8",
    abcdfg: "9",
  };
  for (const line of data) {
    input = line[0].concat(line[1]);
    input.sort((a, b) => a.length - b.length);
    const myMapping = {};

    let two = input.find((n) => n.length === 2).split("");
    let three = input.find((n) => n.length === 3).split("");
    let four = input.find((n) => n.length === 4).split("");

    for (const letter of three) {
      if (!two.includes(letter)) myMapping[letter] = "a";
    }

    outer: for (const n of input) {
      if (n.length === 6) {
        for (const letter of two) {
          if (!n.split("").includes(letter)) {
            myMapping[letter] = "c";
            break outer;
          }
        }
      }
    }

    for (let l of two) {
      if (!(l in myMapping)) {
        myMapping[l] = "f";
      }
    }

    let fourSegs = [];
    for (const letter of four) {
      if (!(letter in myMapping)) fourSegs.push(letter);
    }

    outer: for (const n of input) {
      if (n.length === 5) {
        const lookingForD = new Set();
        let l;
        for (const letter of n.split("")) {
          if (fourSegs.includes(letter)) {
            lookingForD.add(letter);
            l = letter;
          }
        }
        if (lookingForD.size == 1) {
          myMapping[l] = "d";
          break outer;
        }
      }
    }

    for (const letter of fourSegs) {
      if (!(letter in myMapping)) myMapping[letter] = "b";
    }

    outer: for (const n of input) {
      if (n.length === 5) {
        const lookingForG = new Set();
        let l;
        for (const letter of n.split("")) {
          if (!(letter in myMapping)) {
            lookingForG.add(letter);
            l = letter;
          }
        }
        if (lookingForG.size == 1) {
          myMapping[l] = "g";
          break outer;
        }
      }
    }

    for (const letter of "abcdefg".split("")) {
      if (!(letter in myMapping)) myMapping[letter] = "e";
    }

    const output = line[1];

    let value = "";
    for (let number of output) {
      number = number
        .split("")
        .map((x) => myMapping[x])
        .sort()
        .join("");
      value += mapping[number];
    }

    sum += +value;
  }

  return sum;
};

const parseLines = (data) => data.trim().split(String.fromCharCode(10));

module.exports = { part1, part2 };
