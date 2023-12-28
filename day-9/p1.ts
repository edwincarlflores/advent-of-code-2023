import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");

let total = 0;
for (const line of lines) {
  const history = line
    .trim()
    .split(" ")
    .map((l) => parseInt(l));
  total += getNextValue(history);
}

console.log(total);

function getNextValue(history: number[]) {
  let seq = structuredClone(history);
  let nextValue = history[history.length - 1];
  let allZero = false;

  while (!allZero) {
    let allZeroLoc = true;
    const seqTmp = [];
    for (let i = 0; i < seq.length; i++) {
      if (i === seq.length - 1) {
        break;
      }
      const val = seq[i + 1] - seq[i];
      seqTmp.push(val);
      if (allZeroLoc) {
        allZeroLoc = val === 0 ? true : false;
      }
      if (i === seq.length - 2) {
        nextValue += val;
      }
    }
    if (allZeroLoc) {
      allZero = true;
    }
    seq = seqTmp;
  }

  return nextValue;
}
