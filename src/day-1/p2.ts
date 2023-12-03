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

// Get the first digit and last digit per line, if onlye 1 digit, use it for both values
const calibrationValues = lines.map((line) => {
  // Zero or 0 is not accounted for since it is not stated how to handle it in the problem
  const regex =
    /one|1|two|2|three|3|four|4|five|5|six|6|seven|7|eight|8|nine|9/g;

  const matches = line.match(regex);

  if (!matches || matches.length === 0) {
    return 0;
  }

  // Get the first and last items of the matching valid numeric values
  const tuple = [matches[0], matches[matches.length - 1]];

  const numericStringValues = tuple.map((match) => {
    let numericString = match;

    if (Number.isNaN(parseInt(match))) {
      numericString = getNumberFromString(match);
    }

    return numericString;
  });

  // console.log(index + 1, numericStringValues);

  const stringValue = numericStringValues[0] + numericStringValues[1];
  const numericValue = parseInt(stringValue);

  if (Number.isNaN(numericValue)) {
    return 0;
  }

  return numericValue;
});

const sum = calibrationValues.reduce((acc, value) => acc + value, 0);

console.log(sum);
