import { getLines } from "../utils";

// const lines = await getLines("./inputs/test11.txt");
// const lines = await getLines("./inputs/test12.txt");
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

let steps = 0;
let current = "AAA";
const target = "ZZZ";

while (current !== target) {
  const idx = instructions[steps % instructions.length] === "L" ? 0 : 1;
  current = map[current][idx];
  steps++;
}

console.log(steps);
