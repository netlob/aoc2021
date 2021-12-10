"use strict";

// ======
// Part 1
// ======
const part1 = (input) => {
  let [maze, x, y] = parseInput(input);
  const generalDirs = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];
  let sum = 0;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      let isLowPoint = true;
      for (const dir of generalDirs) {
        let newX = i + dir.x;
        let newY = j + dir.y;
        let newLoc = [newX, newY].toString();
        let loc = [i, j].toString();
        if (newLoc in maze) if (maze[loc] >= maze[newLoc]) isLowPoint = false;
      }
      if (isLowPoint) sum += maze[[i, j].toString()] + 1;
    }
  }
  return sum;
};

// ======
// Part 2
// ======
const part2 = (input) => {
  let [maze, x, y] = parseInput(input);
  const generalDirs = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];
  let lowPoints = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      let isLowPoint = true;
      let loc;
      for (const dir of generalDirs) {
        let newX = i + dir.x;
        let newY = j + dir.y;
        let newLoc = [newX, newY].toString();
        loc = [i, j].toString();
        if (newLoc in maze) if (maze[loc] >= maze[newLoc]) isLowPoint = false;
      }
      if (isLowPoint) lowPoints.push(loc);
    }
  }
  //console.log(lowPoints);

  let basins = [];

  for (const lowPoint of lowPoints) {
    let basin = new Set();
    basin.add(lowPoint);
    let lastSize = 0;
    while (basin.size > lastSize) {
      lastSize = basin.size;
      let pointsToExplore = Array.from(basin);
      for (let point of pointsToExplore) {
        // @ts-ignore
        point = point.split(",");
        x = +point[0];
        y = +point[1];
        for (const dir of generalDirs) {
          let newX = x + dir.x;
          let newY = y + dir.y;
          let newLoc = [newX, newY].toString();
          if (newLoc in maze && maze[newLoc] < 9) {
            basin.add(newLoc);
          }
        }
      }
    }
    basins.push(basin.size);
  }
  basins = basins.sort((a, b) => b - a);
  //console.log(basins);
  return basins[0] * basins[1] * basins[2];
};

const parseInput = (input) => {
  input = input.trim().split(String.fromCharCode(10));
  const maze = {};
  input.forEach((line, lineIndex) => {
    line.split("").forEach((loc, locIndex) => {
      maze[[locIndex, lineIndex].toString()] = +loc;
    });
  });
  return [maze, input[0].length, input.length];
};

module.exports = { part1, part2 };
