"use strict";
// ======
// Part 1
// ======
var part1 = function (input) {
    var lines = parseLines(input);
    var easy = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        line = line.split(" | ");
        //console.log(line[1].trim().split(" ").filter( n => [1,4,7,8].includes(n.length)))
        easy += line[1]
            .trim()
            .split(" ")
            .filter(function (n) { return [2, 3, 4, 7].includes(n.length); }).length;
    }
    return easy;
};
// ======
// Part 2
// ======
var part2 = function (input) { };
var parseLines = function (data) { return data.trim().split(String.fromCharCode(10)); };
module.exports = { part1: part1, part2: part2 };
