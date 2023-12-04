import { getLines } from "../utils";

// const lines = await getLines("./inputs/p1-test.txt");
const lines = await getLines("./inputs/p1-input.txt");

const cubes = ["red", "green", "blue"] as const;

type Cube = (typeof cubes)[number];

const config: Record<Cube, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

type CubeFrequency = [Cube, number];

const gameData = new Map<number, CubeFrequency[][]>();

function isGamePossible(subsets: CubeFrequency[][]) {
  let isPossible = true;

  subsetsLoop: for (const cubeFrequencies of subsets) {
    for (const cubeFrequency of cubeFrequencies) {
      const [cube, frequency] = cubeFrequency;

      if (
        (cube === "red" && frequency > config.red) ||
        (cube === "green" && frequency > config.green) ||
        (cube === "blue" && frequency > config.blue)
      ) {
        isPossible = false;
        break subsetsLoop;
      }
    }
  }

  return isPossible;
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

const possibleGames = gameDataArr.filter(([, subsets]) =>
  isGamePossible(subsets),
);

const sum = possibleGames.reduce((acc, [gameNumber]) => acc + gameNumber, 0);
console.log(sum);
