import { getLines } from "../utils";

// const lines = await getLines("./inputs/test2.txt");
const lines = await getLines("./inputs/input.txt");

const map: Record<string, [string, string]> = {};
const instructions = lines.shift();
if (!instructions) {
  throw new Error("Missing instructions");
}

for (const line of lines) {
  if (line === "") {
    continue;
  }

  const currentNode = line.split(" = ")[0].trim();
  const neighbors = line.split(" = ")[1].trim().slice(1, -1).split(", ") as [
    string,
    string,
  ];

  map[currentNode] = neighbors;
}

const current = Object.entries(map)
  .filter((entry) => entry[0][2].toUpperCase() === "A")
  .reduce(
    (acc: Record<string, string>, entry) => ({
      ...acc,
      [entry[0]]: entry[0],
    }),
    {},
  );

const stepsPerEntryLCM = computeLCM(
  Object.entries(current).map(([, curr]) => getStepsPerEntry(curr)),
);

console.log(stepsPerEntryLCM);

function getStepsPerEntry(curr: string) {
  if (!instructions) {
    throw new Error("Missing instructions");
  }
  let steps = 0;
  while (curr[2].toUpperCase() !== "Z") {
    const idx = instructions[steps % instructions.length] === "L" ? 0 : 1;
    curr = map[curr][idx];
    steps++;
  }
  return steps;
}

function computeGCD(num1: number, num2: number) {
  if (num2 === 0) {
    return num1;
  }
  return computeGCD(num2, num1 % num2);
}

function computeLCMByPair(n1: number, n2: number) {
  const gcd = computeGCD(n1, n2);
  return (n1 * n2) / gcd;
}

function computeLCM(nums: number[]) {
  let n = 1;
  for (let i = 0; i < nums.length; ++i) {
    n = computeLCMByPair(nums[i], n);
  }
  return n;
}
