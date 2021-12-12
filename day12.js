"use strict";

// ======
// Part 1
// ======
const part1 = (input) => {
  console.time("part 1");
  const map = parseInput(input);
  let paths = [];
  paths.push(["start"]);
  while (!paths.every((path) => path[path.length - 1] === "end")) {
    let path = paths.shift();
    if (path[path.length - 1] === "end") paths.push(path);
    else {
      let last = path[path.length - 1];
      let nexts = map[last];
      for (const next of nexts) {
        if (next === next.toUpperCase() || !path.includes(next))
          paths.push(path.concat(next));
      }
    }
  }
  console.timeEnd("part 1");
  return paths.length;
};

// ======
// Part 2
// ======
const part2 = (input) => {
  console.time("part 2");
  const map = parseInput(input);
  let paths = [];
  paths.push(["start"]);
  while (!paths.every((path) => path[path.length - 1] === "end")) {
    let path = paths.shift();
    if (path[path.length - 1] === "end") paths.push(path);
    else {
      let last = path[path.length - 1];
      let nexts = map[last];
      for (const next of nexts) {
        let smallTwice =
          new Set(path.filter((cave) => cave === cave.toLowerCase())).size <
          path.filter((cave) => cave === cave.toLowerCase()).length;
        if (
          next === next.toUpperCase() ||
          !path.includes(next) ||
          (!smallTwice && next !== "start")
        )
          paths.push(path.concat(next));
      }
    }
  }
  console.timeEnd("part 2");
  return paths.length;
};

const parseInput = (input) => {
  const lines = input.split(String.fromCharCode(10));
  const map = {};
  const re = /(\w+)-(\w+)/;
  for (const line of lines) {
    let [, from, to] = re.exec(line);
    if (from in map) map[from].push(to);
    else map[from] = [to];
    if (from !== "start" && to !== "end") {
      if (to in map) map[to].push(from);
      else map[to] = [from];
    }
  }
  return map;
};

module.exports = { part1, part2 };
