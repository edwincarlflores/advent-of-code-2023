import { getLines } from "../utils";

const lines = await getLines("./inputs/p1-input.txt");

// Get the first digit and last digit per line, if onlye 1 digit, use it for both values
const calibrationValues = lines.map((line) => {
  const regex = /^[0-9]*$/;
  const chars = line.split("");
  const firstDigit = chars.find((char) => regex.test(char)) ?? "";
  const lastDigit = chars.findLast((char) => regex.test(char)) ?? "";
  const val = firstDigit + lastDigit;

  const numericValue = parseInt(val);

  if (Number.isNaN(numericValue)) {
    return 0;
  }

  return numericValue;
});

const sum = calibrationValues.reduce((acc, value) => acc + value, 0);

console.log(sum);
