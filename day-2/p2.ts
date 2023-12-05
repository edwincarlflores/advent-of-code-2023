import { getLines } from "../utils";

// const lines = await getLines("./inputs/p1-test.txt");
const lines = await getLines("./inputs/p1-input.txt");

const cubes = ["red", "green", "blue"] as const;

type Cube = (typeof cubes)[number];

type CubeFrequency = [Cube, number];

const gameData = new Map<number, CubeFrequency[][]>();

function getMinSetOfCubesPower(subsets: CubeFrequency[][]) {
  // Store minimm number of  cubes per color
  let red = 0;
  let green = 0;
  let blue = 0;

  for (const cubeFrequencies of subsets) {
    for (const cubeFrequency of cubeFrequencies) {
      const [cube, freq] = cubeFrequency;

      if (cube === "red" && freq > red) {
        red = freq;
      }

      if (cube === "green" && freq > green) {
        green = freq;
      }

      if (cube === "blue" && freq > blue) {
        blue = freq;
      }
    }
  }

  // Power of minimum a set of cubes = red * green * blue
  return red * green * blue;
}

for (const line of lines) {
  // Get the game number and store it as the key of the gameData map
  const [game, resultsString] = line.split(":");

  const [, gameNumberString] = game.split(" ");
  const gameNumber = parseInt(gameNumberString);

  const results = resultsString
    .trim()
    .split(";")
    .map((subset) => subset.trim());

  const cubeSubsetsList: CubeFrequency[][] = [];

  for (const result of results) {
    const cubeSubsets: CubeFrequency[] = [];
    const subsets = result.split(",").map((str) => str.trim());

    for (const subset of subsets) {
      const subsetSplit = subset.split(" ");
      const freqStr = subsetSplit[0];
      const cube = subsetSplit[1] as Cube;
      const freq = parseInt(freqStr);

      cubeSubsets.push([cube, freq]);
    }

    cubeSubsetsList.push(cubeSubsets);
  }

  gameData.set(gameNumber, cubeSubsetsList);
}

const gameDataArr = [...gameData];

const minSetGames = gameDataArr.map(([gameNumber, subsets]) => [
  gameNumber,
  getMinSetOfCubesPower(subsets),
]);

const sum = minSetGames.reduce(
  (acc, [, cubeSetPower]) => acc + cubeSetPower,
  0,
);
console.log(sum);
