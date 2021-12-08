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
var part2 = function (input) {
    var lines = parseLines(input);
    var data = lines.map(function (line) {
        return line.split(" | ").map(function (hl) { return hl.trim().split(" "); });
    });
    var sum = 0;
    var mapping = {
        abcefg: "0",
        cf: "1",
        acdeg: "2",
        acdfg: "3",
        bcdf: "4",
        abdfg: "5",
        abdefg: "6",
        acf: "7",
        abcdefg: "8",
        abcdfg: "9"
    };
    var _loop_1 = function (line) {
        input = line[0].concat(line[1]);
        input.sort(function (a, b) { return a.length - b.length; });
        var myMapping = {};
        var two = input.find(function (n) { return n.length === 2; }).split("");
        var three = input.find(function (n) { return n.length === 3; }).split("");
        var four = input.find(function (n) { return n.length === 4; }).split("");
        for (var _a = 0, three_1 = three; _a < three_1.length; _a++) {
            var letter = three_1[_a];
            if (!two.includes(letter))
                myMapping[letter] = "a";
        }
        outer: for (var _b = 0, input_1 = input; _b < input_1.length; _b++) {
            var n = input_1[_b];
            if (n.length === 6) {
                for (var _c = 0, two_1 = two; _c < two_1.length; _c++) {
                    var letter = two_1[_c];
                    if (!n.split("").includes(letter)) {
                        myMapping[letter] = "c";
                        break outer;
                    }
                }
            }
        }
        for (var _d = 0, two_2 = two; _d < two_2.length; _d++) {
            var l = two_2[_d];
            if (!(l in myMapping)) {
                myMapping[l] = "f";
            }
        }
        var fourSegs = [];
        for (var _e = 0, four_1 = four; _e < four_1.length; _e++) {
            var letter = four_1[_e];
            if (!(letter in myMapping))
                fourSegs.push(letter);
        }
        outer: for (var _f = 0, input_2 = input; _f < input_2.length; _f++) {
            var n = input_2[_f];
            if (n.length === 5) {
                var lookingForD = new Set();
                var l = void 0;
                for (var _g = 0, _h = n.split(""); _g < _h.length; _g++) {
                    var letter = _h[_g];
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
        for (var _j = 0, fourSegs_1 = fourSegs; _j < fourSegs_1.length; _j++) {
            var letter = fourSegs_1[_j];
            if (!(letter in myMapping))
                myMapping[letter] = "b";
        }
        outer: for (var _k = 0, input_3 = input; _k < input_3.length; _k++) {
            var n = input_3[_k];
            if (n.length === 5) {
                var lookingForG = new Set();
                var l = void 0;
                for (var _l = 0, _m = n.split(""); _l < _m.length; _l++) {
                    var letter = _m[_l];
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
        for (var _o = 0, _p = "abcdefg".split(""); _o < _p.length; _o++) {
            var letter = _p[_o];
            if (!(letter in myMapping))
                myMapping[letter] = "e";
        }
        var output = line[1];
        var value = "";
        for (var _q = 0, output_1 = output; _q < output_1.length; _q++) {
            var number = output_1[_q];
            number = number
                .split("")
                .map(function (x) { return myMapping[x]; })
                .sort()
                .join("");
            value += mapping[number];
        }
        sum += +value;
    };
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var line = data_1[_i];
        _loop_1(line);
    }
    return sum;
};
var parseLines = function (data) { return data.trim().split(String.fromCharCode(10)); };
module.exports = { part1: part1, part2: part2 };
