import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");

const time = parseInt(
  lines[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((t) => t)
    .join(""),
);

const distance = parseInt(
  lines[1]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((d) => d)
    .join(""),
);

let freq = 0;

for (let m = 0; m <= time; m++) {
  const dist = (time - m) * m;
  if (dist > distance) {
    freq++;
  }
}

console.log(freq);
