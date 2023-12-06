import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");

function getSymbolIndicesPerLine(line: string) {
  const numberRegex = /^[0-9]*$/;
  return line.split("").reduce((acc: number[], char, index) => {
    if (char !== "." && !numberRegex.test(char)) {
      return [...acc, index];
    }
    return acc;
  }, []);
}

type NumberIndexTuple = [number, number];

function getNumberIndexTuplesPerline(line: string) {
  const tuples: NumberIndexTuple[] = [];
  let searchIdx = 0;
  const numberMatches = line.match(/\d+/g) ?? [];

  for (const match of numberMatches) {
    const startIdx = line.indexOf(match, searchIdx);
    tuples.push([parseInt(match), startIdx]);
    searchIdx = startIdx + (match.length - 1) + 1;
  }

  return tuples;
}

function isNumberAdjacentToSymbol(
  numberIndexTuple: NumberIndexTuple,
  symbolIndices: number[],
) {
  let isAdjacent = false;

  for (const symbolIdx of symbolIndices) {
    const [digit, digitIdxStart] = numberIndexTuple;
    const rangeStart = digitIdxStart === 0 ? 0 : digitIdxStart - 1;
    const rangeEnd = digitIdxStart + (digit.toString().length - 1) + 1;

    if (rangeStart <= symbolIdx && symbolIdx <= rangeEnd) {
      isAdjacent = true;
      break;
    }
  }

  return isAdjacent;
}

const partNumbers: number[] = [];

for (let idx = 0; idx < lines.length; idx++) {
  const numberIndexTuples = getNumberIndexTuplesPerline(lines[idx]);
  const prevLineSymbolIndices =
    idx === 0 ? [] : getSymbolIndicesPerLine(lines[idx - 1]);
  const currentLineSymbolIndices = getSymbolIndicesPerLine(lines[idx]);
  const nextLineSymbolIndices =
    idx === lines.length - 1 ? [] : getSymbolIndicesPerLine(lines[idx + 1]);

  for (const numberIndexTuple of numberIndexTuples) {
    if (
      isNumberAdjacentToSymbol(numberIndexTuple, prevLineSymbolIndices) ||
      isNumberAdjacentToSymbol(numberIndexTuple, currentLineSymbolIndices) ||
      isNumberAdjacentToSymbol(numberIndexTuple, nextLineSymbolIndices)
    ) {
      partNumbers.push(numberIndexTuple[0]);
    }
  }
}

const sum = partNumbers.reduce((acc, num) => acc + num, 0);
console.log(sum);
