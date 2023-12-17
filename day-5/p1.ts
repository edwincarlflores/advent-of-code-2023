import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");

const seeds: number[] = [];
const seedsStr = lines.shift();
if (seedsStr) {
  seeds.push(
    ...seedsStr
      .split(": ")[1]
      .split(" ")
      .map((seed) => parseInt(seed)),
  );
}

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
