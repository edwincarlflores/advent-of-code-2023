import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");

let points = 0;

for (const line of lines) {
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

  const cardPoint =
    ownWinningNumbers.length === 0 ? 0 : 2 ** (ownWinningNumbers.length - 1);

  points += cardPoint;
}

console.log(points);
