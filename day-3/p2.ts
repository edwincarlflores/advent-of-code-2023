import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");

function getAsteriskIndicesPerLine(line: string) {
  return line
    .split("")
    .reduce(
      (acc: number[], char, index) => (char === "*" ? [...acc, index] : acc),
      [],
    );
}

type NumberRangeTuple = [number, number[]];

function getNumberRangePerLine(line: string) {
  const tuples: NumberRangeTuple[] = [];
  let searchIdx = 0;
  const numberMatches = line.match(/\d+/g) ?? [];

  for (const match of numberMatches) {
    const startIdx = line.indexOf(match, searchIdx);
    const rangeStart = startIdx === 0 ? 0 : startIdx - 1;
    const rangeEnd = startIdx + (match.length - 1) + 1;
    tuples.push([parseInt(match), [rangeStart, rangeEnd]]);
    searchIdx = startIdx + (match.length - 1) + 1;
  }

  return tuples;
}

function getAdjacentNumbersFromAsterisk(
  asteriskIdx: number,
  numberRangeTuples: NumberRangeTuple[],
) {
  const adjacentNumbers: number[] = [];

  for (const numberRange of numberRangeTuples) {
    const [number, [start, end]] = numberRange;
    if (start <= asteriskIdx && asteriskIdx <= end) {
      adjacentNumbers.push(number);
    }
  }

  return adjacentNumbers;
}

const gearRatios: number[] = [];

for (let idx = 0; idx < lines.length; idx++) {
  const asteriskIndeces = getAsteriskIndicesPerLine(lines[idx]);

  for (const asteriskIdx of asteriskIndeces) {
    const prevLineAdjacentNums = getAdjacentNumbersFromAsterisk(
      asteriskIdx,
      idx === 0 ? [] : getNumberRangePerLine(lines[idx - 1]),
    );
    const currentLineAdjacentNums = getAdjacentNumbersFromAsterisk(
      asteriskIdx,
      getNumberRangePerLine(lines[idx]),
    );
    const nextLineAdjacentNums = getAdjacentNumbersFromAsterisk(
      asteriskIdx,
      idx === lines.length - 1 ? [] : getNumberRangePerLine(lines[idx + 1]),
    );

    const partNumbers = [
      ...prevLineAdjacentNums,
      ...currentLineAdjacentNums,
      ...nextLineAdjacentNums,
    ];

    if (partNumbers.length === 2) {
      gearRatios.push(partNumbers.reduce((acc, num) => acc * num, 1));
    }
  }
}

const sum = gearRatios.reduce((acc, num) => acc + num, 0);
console.log(sum);
