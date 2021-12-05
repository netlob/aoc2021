"use strict";
// ======
// Part 1
// ======
var part1 = function (input) {
    var lines = parseLines(input);
    var scores = {};
    lines.forEach(function (line) {
        if (line.dx != 0 && line.dy !== 0)
            return;
        line.points.forEach(function (p) {
            if (!scores[p]) {
                scores[p] = 1;
            }
            else {
                scores[p] += 1;
            }
        });
    });
    return Object.values(scores).filter(function (s) { return s >= 2; }).length;
};
// ======
// Part 2
// ======
var part2 = function (input) {
    var lines = parseLines(input);
    var scores = {};
    lines.forEach(function (line) {
        line.points.forEach(function (p) {
            if (!scores[p]) {
                scores[p] = 1;
            }
            else {
                scores[p] += 1;
            }
        });
    });
    return Object.values(scores).filter(function (s) { return s >= 2; }).length;
};
var parseLines = function (input) {
    return input
        .trim()
        .split("\n")
        .map(function (line) {
        var _a = line
            .split(" -> ")
            .map(function (p) { return p.split(",").map(Number); }), _b = _a[0], x1 = _b[0], y1 = _b[1], _c = _a[1], x2 = _c[0], y2 = _c[1];
        var d = gcd(Math.abs(x2 - x1), Math.abs(y2 - y1));
        var dx = (x2 - x1) / d;
        var dy = (y2 - y1) / d;
        var points = [];
        var x = x1, y = y1;
        while (true) {
            points.push([x, y].join(","));
            if (x === x2 && y === y2)
                break;
            x += dx;
            y += dy;
        }
        return { dx: dx, dy: dy, points: points };
    });
};
var gcd = function (a, b) { return (!b ? a : gcd(b, a % b)); };
module.exports = { part1: part1, part2: part2 };
