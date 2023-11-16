const input = Bun.file("input.txt");

const _ = await input.text();

let data = _.split("\n");
data.pop();

const columns = [
  ["C", "S", "G", "B"],
  ["G", "V", "N", "J", "H", "W", "M", "T"],
  ["S", "Q", "M"],
  ["M", "N", "W", "T", "L", "S", "B"],
  ["P", "W", "G", "V", "T", "F", "Z", "J"],
  ["S", "H", "Q", "G", "B", "T", "C"],
  ["W", "B", "P", "J", "T"],
  ["M", "Q", "T", "F", "Z", "C", "D", "G"],
  ["F", "P", "B", "H", "S", "N"],
];

// regex to select all numbers form a string
const regex = /\d+/g;

const moveList = data
  .slice(10)
  .map((move) => move.match(regex) as string[])
  .map((move) => [
    parseInt(move[0]),
    parseInt(move[1]) - 1,
    parseInt(move[2]) - 1,
  ]);

for (const move of moveList) {
  const [numberToMove, startIndex, endIndex] = move;

  const lettersToMove = columns[startIndex].splice(0, numberToMove) as string[];

  columns[endIndex] = lettersToMove.concat(columns[endIndex]);
}

console.log(columns.map((row) => row[0]).join(""));
