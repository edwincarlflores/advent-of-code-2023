import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");
const labels = "23456789TJQKA";

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

function getHandStrength(hand: string) {
  const cardFrequencies = new Map<string, number>();
  const freqs = new Map<number, number>();
  for (const card of hand) {
    cardFrequencies.set(card, (cardFrequencies.get(card) ?? 0) + 1);
  }
  for (const [, freq] of Array.from(cardFrequencies)) {
    freqs.set(freq, (freqs.get(freq) ?? 0) + 1);
  }
  const freqsTuples = Array.from(freqs).sort((a, b) => b[0] - a[0]);

  if (isFiveOfAKind(freqsTuples)) {
    return 7;
  }

  if (isFourOfAKind(freqsTuples)) {
    return 6;
  }

  if (isFullHouse(freqsTuples)) {
    return 5;
  }

  if (isThreeOfAKind(freqsTuples)) {
    return 4;
  }

  if (isTwoPair(freqsTuples)) {
    return 3;
  }

  if (isOnePair(freqsTuples)) {
    return 2;
  }

  if (isHighCard(freqsTuples)) {
    return 1;
  }

  throw new Error("Invalid hand combination");
}

const cardBidMap = new Map<string, number>();

for (const line of lines) {
  cardBidMap.set(
    line.split(" ")[0].trim(),
    parseInt(line.split(" ")[1].trim()),
  );
}

function compareHands(handA: string, handB: string) {
  let val = 0;
  for (let i = 0; i < handA.length; i++) {
    const cardValueA = labels.indexOf(handA[i]);
    const cardValueB = labels.indexOf(handB[i]);
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
