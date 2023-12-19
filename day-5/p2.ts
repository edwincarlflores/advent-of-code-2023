import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");

const seedRanges: number[][] = [];
const seedsStr = lines.shift();

if (!seedsStr) {
  throw new Error("Invalid seed information");
}

console.log(seedsStr);

const nums = seedsStr
  .split(": ")[1]
  .split(" ")
  .map((seed) => parseInt(seed));

while (nums.length) {
  const start = nums.shift();
  const length = nums.shift();
  if (!start || !length) {
    break;
  }
  seedRanges.push([start, length]);
}

console.log(seedRanges);

// Retain logic from part 1
const maps: string[][] = [];
let mapsIdx = -1;

while (lines.length) {
  const line = lines.shift();
  if (!line) {
    continue;
  }

  if (line.includes("map")) {
    mapsIdx++;
    continue;
  }

  if (!maps[mapsIdx]) {
    maps[mapsIdx] = [];
  }

  maps[mapsIdx].push(line);
}

function getRange(ranges: number[][]) {
  const start = Math.min(...ranges.map((r) => r[0]));
  const end = Math.max(...ranges.map((r) => r[0] + r[1] - 1));
  return [start, end];
}

function isSeed(ranges: number[][], num: number) {
  return ranges.some((r) => r[0] <= num && num < r[0] + r[1]);
}

function getLocationFromSeed(seed: number) {
  let current = seed;
  for (const map of maps) {
    for (const val of map) {
      const [destStart, sourceStart, range] = val
        .split(" ")
        .map((v) => parseInt(v));

      if (sourceStart <= current && current < sourceStart + range) {
        current = destStart + (current - sourceStart);
        break;
      }
    }
  }

  return current;
}

const range = getRange(seedRanges);
console.log("range:", range);

let minLocation = range[1];
for (let i = range[0]; i < range[1]; i++) {
  console.log("PROCESSING:", i);
  if (!isSeed(seedRanges, i)) {
    continue;
  }

  const location = getLocationFromSeed(i);
  if (location < minLocation) {
    minLocation = location;
  }
}
console.log(minLocation);
