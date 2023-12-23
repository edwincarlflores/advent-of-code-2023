import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");

type TimeDistanceTuple = [number, number];
const tuples: TimeDistanceTuple[] = [];
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
  tuples.push([times[i], distances[i]]);
}

for (let i = 0; i < tuples.length; i++) {
  for (let m = 0; m <= tuples[i][0]; m++) {
    const dist = (tuples[i][0] - m) * m;
    if (dist > tuples[i][1]) {
      if (!frequencies[i]) {
        frequencies[i] = 0;
      }
      frequencies[i]++;
    }
  }
}

const answer = frequencies.reduce((acc, freq) => acc * freq, 1);
console.log(answer);
