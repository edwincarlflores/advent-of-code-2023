import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");

const frequencies: number[] = [];

const times = lines[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .filter((t) => t)
  .map((t) => parseInt(t));

const distances = lines[1]
  .split(":")[1]
  .trim()
  .split(" ")
  .filter((d) => d)
  .map((d) => parseInt(d));

for (let i = 0; i < times.length; i++) {
  for (let m = 0; m <= times[i]; m++) {
    const dist = (times[i] - m) * m;
    if (dist > distances[i]) {
      if (!frequencies[i]) {
        frequencies[i] = 0;
      }
      frequencies[i]++;
    }
  }
}

const answer = frequencies.reduce((acc, freq) => acc * freq, 1);
console.log(answer);
