import { getLines } from "../utils";

const lines = await getLines("./inputs/test.txt");
// const lines = await getLines("./inputs/input.txt");

const seedsSet = new Set<number>();
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
for (const [start, length] of seedRanges) {
  for (let idx = 0; idx < length; idx++) {
    seedsSet.add(start + idx);
  }
}

const seeds = Array.from(seedsSet);
console.log(seeds);

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

const minLocation = Math.min(...seeds.map((seed) => getLocationFromSeed(seed)));
console.log(minLocation);
