export const readFileText = async (path: string) => {
  const text = await Bun.file(path).text();
  return text;
};

export const getLines = async (path: string) => {
  const text = await readFileText(path);
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  return lines;
};

export const getLinesUntrimmed = async (path: string) => {
  const text = await readFileText(path);
  const lines = text.split("\n");
  return lines;
};
