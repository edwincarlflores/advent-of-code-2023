import { getLines } from "../utils";

// const lines = await getLines("./inputs/test.txt");
const lines = await getLines("./inputs/input.txt");
lines.reverse();

let total = 0;
for (const line of lines) {
  const history = line
    .trim()
    .split(" ")
    .map((l) => parseInt(l));
  total += getLeftmostValue(history);
}
console.log(total);

function getLeftmostValue(history: number[]) {
  let seq = structuredClone(history);
  let nextValue = history[0];
  let allZero = false;
  let count = 0;

  while (!allZero) {
    let allZeroLoc = true;
    const seqTmp = [];
    for (let i = seq.length - 1; i > 0; i--) {
      const val = seq[i] - seq[i - 1];
      seqTmp.push(val);
      if (allZeroLoc) {
        allZeroLoc = val === 0 ? true : false;
      }
      if (i === 1) {
        if (count % 2 === 0) {
          nextValue -= val;
        } else {
          nextValue += val;
        }
        count++;
      }
    }
    if (allZeroLoc) {
      count = 0;
      allZero = true;
    }
    seq = seqTmp.reverse();
  }

  return nextValue;
}
