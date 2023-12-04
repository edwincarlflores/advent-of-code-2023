import { getLines } from "../utils";

// const lines = await getLines("./inputs/p2-test.txt");
const lines = await getLines("./inputs/p2-input.txt");

const getNumberFromString = (numberString: string) => {
  switch (numberString) {
    case "one":
      return "1";
    case "two":
      return "2";
    case "three":
      return "3";
    case "four":
      return "4";
    case "five":
      return "5";
    case "six":
      return "6";
    case "seven":
      return "7";
    case "eight":
      return "8";
    case "nine":
      return "9";
    default:
      return "";
  }
};

const numberStrings = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
const wordStrings = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
] as const;

const digitStrings = [...numberStrings, ...wordStrings];

type Digit = (typeof digitStrings)[number];

// Not proud of this but it works
const getLastDigit = (line: string) => {
  const map = new Map<Digit, number>();

  for (const digit of digitStrings) {
    if (line.indexOf(digit) > -1) {
      map.set(digit, line.lastIndexOf(digit));
    }
  }

  const arr = [...map];
  const sortedArr = arr.sort((a, b) => b[1] - a[1]);

  return sortedArr[0][0];
};

// Get the first digit and last digit per line, if only 1 digit, use it for both values
const calibrationValues = lines.map((line) => {
  // Zero or 0 is not accounted for since it is not stated how to handle it in the problem
  const regex =
    /one|1|two|2|three|3|four|4|five|5|six|6|seven|7|eight|8|nine|9/g;

  const matches = line.match(regex);

  if (!matches || matches.length === 0) {
    return 0;
  }

  const tuple = [matches[0], getLastDigit(line)];

  const numericStringValues = tuple.map((value) => {
    let numericString = value;

    if (Number.isNaN(parseInt(value))) {
      numericString = getNumberFromString(value);
    }

    return numericString;
  });

  const stringValue = numericStringValues[0] + numericStringValues[1];
  const numericValue = parseInt(stringValue);

  if (Number.isNaN(numericValue)) {
    return 0;
  }

  return numericValue;
});

const sum = calibrationValues.reduce((acc, value) => acc + value, 0);

console.log(sum);
