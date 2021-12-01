const fs = require("fs");

const input = fs.readFileSync("inputs/1").toString();
const parsed = input.split("\n").map((x) => parseInt(x));

const p1 = () => {
  //   let largerThanPrevious = 0;
  //   for (let i = 0; i < parsed.length; i++) {
  //     console.log(
  //       parsed[i],
  //       parsed[i] > parsed[i - 1] ? "(increased)" : "(decreased)"
  //     );
  //     if (parsed[i] > parsed[i - 1]) {
  //       largerThanPrevious++;
  //     }
  //   }
  // result from for loop was 1120 and incorrect

  const largerThanPrevious = parsed.reduce(
    (p, c, i, a) => p + Number(i > 0 && a[i] > a[i - 1]),
    0
  );
  // reduce gave the right answer :)

  return largerThanPrevious;
};

const p2 = () => {
  const largerThanPrevious = parsed.reduce(
    (p, c, i, a) => p + Number(i > 2 && a[i] > a[i - 3]),
    0
  );

  return largerThanPrevious;
};

console.log("p1", p1());
console.log("p2", p2());
