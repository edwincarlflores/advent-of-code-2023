import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");

function getCardsWon(cardNumber: number) {
  const line = lines[cardNumber - 1];
  const numbers = line.split(":")[1].trim().split(" | ");
  const winningNumbers = numbers[0]
    .split(" ")
    .filter((num) => num !== "")
    .map((num) => parseInt(num));
  const ownNumbers = numbers[1]
    .split(" ")
    .filter((num) => num !== "")
    .map((num) => parseInt(num));
  const ownWinningNumbers = winningNumbers.filter((winningNumber) =>
    ownNumbers.includes(winningNumber),
  );

  const cardsWon: number[] = [];
  for (let idx = 1; idx <= ownWinningNumbers.length; idx++) {
    cardsWon.push(cardNumber + idx);
  }
  return cardsWon;
}

const toProcess = new Array(lines.length).fill(0).map((_, i) => i + 1);
const lookup: Record<number, number[]> = {};
const frequencies: Record<number, number> = {};

while (toProcess.length) {
  const cardNum = toProcess.pop();

  if (!cardNum) {
    break;
  }

  frequencies[cardNum] = frequencies[cardNum] ? frequencies[cardNum] + 1 : 1;
  const points = lookup[cardNum] ? lookup[cardNum] : getCardsWon(cardNum);

  if (!lookup[cardNum]) {
    lookup[cardNum] = points;
  }

  toProcess.push(...points);
}

const totalCardsCount = Object.entries(frequencies).reduce(
  (acc, [, count]) => acc + count,
  0,
);

console.log(totalCardsCount);
