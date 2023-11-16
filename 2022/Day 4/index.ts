const input = Bun.file("input.txt");

const data = await input.text();

// How many pairs of elves have overlapping ranges?

let stringPairs = data.split("\n");
stringPairs.pop();
stringPairs.pop();

// console.log(stringPairs);
const pairs = stringPairs.map((line) => {
  const elves = line.split(",");

  return [
    elves[0].split("-").map((num) => parseInt(num)),
    elves[1].split("-").map((num) => parseInt(num)),
  ];
});

// console.log(pairs);

let encompassingCount: number = 0;

function between(num: number, min: number, max: number) {
  return num >= min && num <= max;
}

function hasOverlap(elf1: number[], elf2: number[]) {
  const [elf1Start, elf1End] = elf1;
  const [elf2Start, elf2End] = elf2;

  if (between(elf2Start, elf1Start, elf1End)) {
    return true;
  } else if (between(elf2End, elf1Start, elf1End)) {
    return true;
  } else {
    return false;
  }
}

for (const pair of pairs) {
  const [elf1, elf2] = pair;

  if (hasOverlap(elf1, elf2) || hasOverlap(elf2, elf1)) {
    encompassingCount++;
  }

  // console.log(elf1Start, elf1End, elf2Start, elf2End);
}

// [1, 2, 3, 4, 5, 6, 7 ] => [1, 7]
// [4, 5, 6, 7, 8, 9, 10] => [4, 10]

console.log(encompassingCount);
