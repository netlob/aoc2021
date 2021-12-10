"use strict";
// ======
// Part 1
// ======
var part1 = function (input) {
    var _a = parseInput(input), maze = _a[0], x = _a[1], y = _a[2];
    var generalDirs = [
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
    ];
    var sum = 0;
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            var isLowPoint = true;
            for (var _i = 0, generalDirs_1 = generalDirs; _i < generalDirs_1.length; _i++) {
                var dir = generalDirs_1[_i];
                var newX = i + dir.x;
                var newY = j + dir.y;
                var newLoc = [newX, newY].toString();
                var loc = [i, j].toString();
                if (newLoc in maze)
                    if (maze[loc] >= maze[newLoc])
                        isLowPoint = false;
            }
            if (isLowPoint)
                sum += maze[[i, j].toString()] + 1;
        }
    }
    return sum;
};
// ======
// Part 2
// ======
var part2 = function (input) {
    var _a = parseInput(input), maze = _a[0], x = _a[1], y = _a[2];
    var generalDirs = [
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
    ];
    var lowPoints = [];
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            var isLowPoint = true;
            var loc = void 0;
            for (var _i = 0, generalDirs_2 = generalDirs; _i < generalDirs_2.length; _i++) {
                var dir = generalDirs_2[_i];
                var newX = i + dir.x;
                var newY = j + dir.y;
                var newLoc = [newX, newY].toString();
                loc = [i, j].toString();
                if (newLoc in maze)
                    if (maze[loc] >= maze[newLoc])
                        isLowPoint = false;
            }
            if (isLowPoint)
                lowPoints.push(loc);
        }
    }
    //console.log(lowPoints);
    var basins = [];
    for (var _b = 0, lowPoints_1 = lowPoints; _b < lowPoints_1.length; _b++) {
        var lowPoint = lowPoints_1[_b];
        var basin = new Set();
        basin.add(lowPoint);
        var lastSize = 0;
        while (basin.size > lastSize) {
            lastSize = basin.size;
            var pointsToExplore = Array.from(basin);
            for (var _c = 0, pointsToExplore_1 = pointsToExplore; _c < pointsToExplore_1.length; _c++) {
                var point = pointsToExplore_1[_c];
                // @ts-ignore
                point = point.split(",");
                x = +point[0];
                y = +point[1];
                for (var _d = 0, generalDirs_3 = generalDirs; _d < generalDirs_3.length; _d++) {
                    var dir = generalDirs_3[_d];
                    var newX = x + dir.x;
                    var newY = y + dir.y;
                    var newLoc = [newX, newY].toString();
                    if (newLoc in maze && maze[newLoc] < 9) {
                        basin.add(newLoc);
                    }
                }
            }
        }
        basins.push(basin.size);
    }
    basins = basins.sort(function (a, b) { return b - a; });
    //console.log(basins);
    return basins[0] * basins[1] * basins[2];
};
var parseInput = function (input) {
    input = input.trim().split(String.fromCharCode(10));
    var maze = {};
    input.forEach(function (line, lineIndex) {
        line.split("").forEach(function (loc, locIndex) {
            maze[[locIndex, lineIndex].toString()] = +loc;
        });
    });
    return [maze, input[0].length, input.length];
};
module.exports = { part1: part1, part2: part2 };
