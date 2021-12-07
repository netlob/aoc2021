"use strict";
// ======
// Part 1
// ======
var part1 = function (input) {
    var crabs = parseInput(input);
    var min = Math.min.apply(Math, crabs);
    var max = Math.max.apply(Math, crabs);
    var best = 1 / 0;
    for (var alignTo = min; alignTo <= max; alignTo++) {
        var actual = 0;
        for (var _i = 0, crabs_1 = crabs; _i < crabs_1.length; _i++) {
            var crab = crabs_1[_i];
            actual += Math.abs(alignTo - crab);
        }
        if (actual < best)
            best = actual;
    }
    return best;
};
// ======
// Part 2
// ======
var part2 = function (input) {
    var crabs = parseInput(input);
    var min = Math.min.apply(Math, crabs);
    var max = Math.max.apply(Math, crabs);
    var distances = [0];
    for (var i = 1; i < max; i++) {
        distances.push(distances[i - 1] + i);
    }
    var best = 1 / 0;
    for (var alignTo = min; alignTo <= max; alignTo++) {
        var actual = 0;
        for (var _i = 0, crabs_2 = crabs; _i < crabs_2.length; _i++) {
            var crab = crabs_2[_i];
            actual += distances[Math.abs(alignTo - crab)];
        }
        if (actual < best)
            best = actual;
    }
    return best;
};
var parseInput = function (input) { return input.trim().split(",").map(Number); };
module.exports = { part1: part1, part2: part2 };
