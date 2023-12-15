import { getLines } from "../utils";

const lines = await getLines("./inputs/test.txt");
// const lines = await getLines("./inputs/input.txt");

const allCards: number[] = [];
const initialCards: number[] = [];
const cardsWonLookup = new Map<number, number[]>();

function getCardsWon(cardNumber: number, matchLength: number) {
  const cardsWon: number[] = [];
  for (let idx = 1; idx <= matchLength; idx++) {
    cardsWon.push(cardNumber + idx);
  }
  return cardsWon;
}

function addAllCardsWon(cardNumber: number) {
  const cardsWon = cardsWonLookup.get(cardNumber);
  if (!cardsWon || cardsWon.length === 0) {
    return;
  }

  for (const cardWon of cardsWon) {
    allCards.push(cardWon);
    addAllCardsWon(cardWon);
  }
}

for (const line of lines) {
  const cardNumber = parseInt(line.split(":")[0].trim().split(" ")[1]);
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

  initialCards.push(cardNumber);

  cardsWonLookup.set(
    cardNumber,
    getCardsWon(cardNumber, ownWinningNumbers.length),
  );
}

console.log(cardsWonLookup);
// console.log(initialCards);

for (const card of initialCards) {
  allCards.push(card);
  addAllCardsWon(card);
}

console.log(allCards);
console.log(allCards.length);
