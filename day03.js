"use strict";

// ======
// Part 1
// ======
const part1 = (input) => {
  const parsed = parseInput(input);
  const bitsPerColumn = parsed[0].split("").map((_, i) => {
    return parsed.map((val) => val[i]);
  });

  const gammaBits = [];
  for (let i = 0; i < bitsPerColumn.length; i++) {
    let ones = 0;
    let zeroes = 0;
    bitsPerColumn[i].forEach((bit) => (bit == "1" ? ones++ : zeroes++));
    gammaBits[i] = ones > zeroes ? "1" : "0";
  }

  const epsilonBits = [];
  for (let i = 0; i < bitsPerColumn.length; i++) {
    let ones = 0;
    let zeroes = 0;
    bitsPerColumn[i].forEach((bit) => (bit == "1" ? ones++ : zeroes++));
    epsilonBits[i] = ones < zeroes ? "1" : "0";
  }

  const gammaDecimal = parseInt(gammaBits.join(""), 2);
  const epsilonDecimal = parseInt(epsilonBits.join(""), 2);

  return gammaDecimal * epsilonDecimal;
};

// ======
// Part 2
// ======
const part2 = (input) => {
  const parsed = parseInput(input);

  const bitsPerColumn = parsed.map((x) => x.split(""));

  let oxygenBits = bitsPerColumn;
  let co2ScrubberBits = bitsPerColumn;

  for (let i = 0; i < oxygenBits[0].length; i++) {
    if (oxygenBits.length == 1) break;
    const ones = oxygenBits.map((x) => x[i]).filter((x) => x == 1).length;
    const zeroes = oxygenBits.length - ones;
    oxygenBits = oxygenBits.filter((x) => (x[i] == ones >= zeroes ? 1 : 0));
  }

  for (let i = 0; i < co2ScrubberBits[0].length; i++) {
    if (co2ScrubberBits.length == 1) break;
    const ones = co2ScrubberBits.map((x) => x[i]).filter((x) => x == 1).length;
    const zeroes = co2ScrubberBits.length - ones;
    co2ScrubberBits = co2ScrubberBits.filter((x) =>
      x[i] == ones >= zeroes ? 0 : 1
    );
  }

  const oxygenDecimal = parseInt(oxygenBits[0].join(""), 2);
  const co2ScrubberDecimal = parseInt(co2ScrubberBits[0].join(""), 2);

  return oxygenDecimal * co2ScrubberDecimal;
};

const parseInput = (input) => input.split("\n");

module.exports = { part1, part2 };
