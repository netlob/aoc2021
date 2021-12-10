"use strict";
// ======
// Part 1
// ======
var part1 = function (input) {
    console.time("part1");
    var fishes = parseInput(input);
    var days = 80;
    var makingFishes = new Array(8).fill(0);
    fishes.forEach(function (f) { return (makingFishes[f] = makingFishes[f] + 1 || 1); });
    var total = 0;
    for (var i = 0; i < days; i++) {
        if (i in makingFishes) {
            var newFish = makingFishes[i];
            makingFishes[i + 7] = makingFishes[i + 7] + newFish || newFish;
            makingFishes[i + 9] = makingFishes[i + 9] + newFish || newFish;
            if (i + 7 >= days)
                total += newFish;
            if (i + 9 >= days)
                total += newFish;
        }
    }
    console.timeEnd("part1");
    return total;
};
// ======
// Part 2
// ======
var part2 = function (input) {
    console.time("part2");
    var fishes = parseInput(input);
    var days = 256;
    var makingFishes = [0];
    fishes.forEach(function (f) { return (makingFishes[f] = makingFishes[f] + 1 || 1); });
    var total = 0;
    for (var i = 0; i < days; i++) {
        if (i in makingFishes) {
            var newFish = makingFishes[i];
            makingFishes[i + 7] = makingFishes[i + 7] + newFish || newFish;
            makingFishes[i + 9] = makingFishes[i + 9] + newFish || newFish;
            if (i + 7 >= days)
                total += newFish;
            if (i + 9 >= days)
                total += newFish;
        }
    }
    console.timeEnd("part2");
    return total;
};
var parseInput = function (input) { return input.trim().split(",").map(Number); };
module.exports = { part1: part1, part2: part2 };
