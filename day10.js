"use strict";
var Line = /** @class */ (function () {
    function Line(line) {
        this.line = line;
    }
    Line.prototype.isCorrupted = function () {
        var reduce = this.reduce();
        var regex = /<}|\[}|\(}|<]|{]|\(]|<\)|{\)|\[\)|\(>|{>|\[>/g;
        return regex.test(reduce);
    };
    Line.prototype.getFirstIllegalCharacter = function () {
        var reduce = this.reduce().split("");
        var regex = /[>}\])]/g;
        for (var i = 0; i < reduce.length; i++) {
            if (regex.test(reduce[i])) {
                return reduce[i];
            }
        }
    };
    Line.prototype.reduce = function () {
        var regex = /<>|\[]|{}|\(\)/g;
        var reducedLine = this.line;
        while (this.line !== "" && regex.test(reducedLine)) {
            reducedLine = reducedLine.replace(regex, "");
        }
        return reducedLine;
    };
    Line.prototype.isIncomplete = function () {
        return this.reduce() !== "" && !this.isCorrupted();
    };
    Line.prototype.getCompletion = function () {
        return this.reduce()
            .split("")
            .reverse()
            .map(function (char) {
            if (char === "{") {
                return "}";
            }
            else if (char === "[") {
                return "]";
            }
            else if (char === "(") {
                return ")";
            }
            else if (char === "<") {
                return ">";
            }
        })
            .join("");
    };
    return Line;
}());
// ======
// Part 1
// ======
var day10part1 = function (input) {
    var lines = parseLines(input);
    var corruptedLines = lines.filter(function (line) { return line.isCorrupted(); });
    var illegalCharacters = corruptedLines.map(function (line) {
        return line.getFirstIllegalCharacter();
    });
    var illegalCharacterValue = new Map();
    illegalCharacterValue.set(")", 3);
    illegalCharacterValue.set("]", 57);
    illegalCharacterValue.set("}", 1197);
    illegalCharacterValue.set(">", 25137);
    var illegalCharactersValues = illegalCharacters.map(function (char) {
        return illegalCharacterValue.get(char);
    });
    return illegalCharactersValues.reduce(function (p, c) { return p + c; }, 0);
};
// ======
// Part 2
// ======
var day10part2 = function (input) {
    var lines = parseLines(input);
    var completions = lines
        .filter(function (line) { return line.isIncomplete(); })
        .map(function (line) { return line.getCompletion(); });
    var scores = completions
        .map(function (completion) {
        return completion
            .split("")
            .map(function (char) {
            if (char === ")") {
                return 1;
            }
            else if (char === "]") {
                return 2;
            }
            else if (char === "}") {
                return 3;
            }
            else if (char === ">") {
                return 4;
            }
        })
            .reduce(function (acc, value) {
            return acc * 5 + value;
        }, 0);
    })
        .sort(function (a, b) { return a - b; });
    return scores[Math.floor(scores.length / 2)];
};
var parseLines = function (input) {
    return input
        .trim()
        .split("\n")
        .map(function (line) { return new Line(line); });
};
module.exports = { part1: day10part1, part2: day10part2 };
