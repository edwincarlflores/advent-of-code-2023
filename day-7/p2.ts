import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");

// Main flow start
const cardBidMap = new Map<string, number>();

for (const line of lines) {
  cardBidMap.set(
    line.split(" ")[0].trim(),
    parseInt(line.split(" ")[1].trim()),
  );
}

const sortedMapByHandStrength = Array.from(cardBidMap).toSorted((a, b) => {
  const handStrengthA = getHandStrength(a[0]);
  const handStrengthB = getHandStrength(b[0]);
  if (handStrengthA > handStrengthB) {
    return 1;
  }
  if (handStrengthA < handStrengthB) {
    return -1;
  }

  return compareHands(a[0], b[0]);
});

const total = sortedMapByHandStrength.reduce(
  (acc: number, [, bid], idx) => acc + bid * (idx + 1),
  0,
);
console.log(total);

// utility functions
function getCardValue(card: string) {
  if (card === "0" || card === "1") {
    throw new Error("Invalid card number");
  }

  if (/^[0-9]*$/.test(card)) {
    return parseInt(card);
  }

  switch (card) {
    case "J":
      return 1;
    case "T":
      return 10;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    default:
      throw new Error("Invalid card");
  }
}

function isFiveOfAKind(tuples: [number, number][]) {
  return tuples[0][0] === 5;
}

function isFourOfAKind(tuples: [number, number][]) {
  return tuples[0][0] === 4;
}

function isFullHouse(tuples: [number, number][]) {
  return (
    tuples[0][0] === 3 &&
    tuples[0][1] === 1 &&
    tuples[1][0] === 2 &&
    tuples[1][1] === 1
  );
}

function isThreeOfAKind(tuples: [number, number][]) {
  return (
    tuples[0][0] === 3 &&
    tuples[0][1] === 1 &&
    tuples[1][0] === 1 &&
    tuples[1][1] === 2
  );
}

function isTwoPair(tuples: [number, number][]) {
  return tuples[0][0] === 2 && tuples[0][1] === 2;
}

function isOnePair(tuples: [number, number][]) {
  return (
    tuples[0][0] === 2 &&
    tuples[0][1] === 1 &&
    tuples[1][0] === 1 &&
    tuples[1][1] === 3
  );
}

function isHighCard(tuples: [number, number][]) {
  return tuples[0][0] === 1 && tuples[0][1] === 5;
}

function getStrongestHandTuples(known: [string, number][], jokerCount: number) {
  if (jokerCount === 0) {
    return known;
  }

  // if there's only one type of card, we can make it five of a kind
  if (known.length === 1) {
    known[0][1] += jokerCount;
    return known;
  }

  if (known[0][1] >= known[1][1]) {
    known[0][1] += jokerCount;
    return known;
  }

  return known;
}

function getCardFrequencyTuples(hand: string) {
  const cardFrequencies = new Map<string, number>();
  for (const card of hand) {
    cardFrequencies.set(card, (cardFrequencies.get(card) ?? 0) + 1);
  }

  const sortedTuples = Array.from(cardFrequencies).toSorted(
    (a, b) => b[1] - a[1],
  );

  const found = sortedTuples.find((t) => t[0] === "J");
  if (!found || found[1] === 5) {
    return Array.from(cardFrequencies);
  }

  sortedTuples.splice(sortedTuples.indexOf(found), 1);
  return getStrongestHandTuples(sortedTuples, found[1]);
}

function getHandStrength(hand: string) {
  const freqs = new Map<number, number>();
  const cardFrequencyTuples = getCardFrequencyTuples(hand);

  for (const [, freq] of cardFrequencyTuples) {
    freqs.set(freq, (freqs.get(freq) ?? 0) + 1);
  }
  const freqsTuples = Array.from(freqs).sort((a, b) => b[0] - a[0]);
  if (!freqsTuples || freqsTuples.length === 0) {
    throw new Error(
      `Invalid frequency tuples for hand ${hand}: ${cardFrequencyTuples}`,
    );
  }

  switch (true) {
    case isFiveOfAKind(freqsTuples):
      return 7;
    case isFourOfAKind(freqsTuples):
      return 6;
    case isFullHouse(freqsTuples):
      return 5;
    case isThreeOfAKind(freqsTuples):
      return 4;
    case isTwoPair(freqsTuples):
      return 3;
    case isOnePair(freqsTuples):
      return 2;
    case isHighCard(freqsTuples):
      return 1;
    default:
      throw new Error("Invalid hand combination");
  }
}

function compareHands(handA: string, handB: string) {
  let val = 0;
  for (let i = 0; i < handA.length; i++) {
    const cardValueA = getCardValue(handA[i]);
    const cardValueB = getCardValue(handB[i]);
    if (cardValueA === cardValueB) {
      continue;
    }

    if (cardValueA > cardValueB) {
      val = 1;
      break;
    }

    if (cardValueA < cardValueB) {
      val = -1;
      break;
    }
  }
  return val;
}
