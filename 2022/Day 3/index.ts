const input = Bun.file("input.txt");

const data = await input.text();

const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" as const;

const elves = data.split("\n");

elves.pop();

let groups: string[][][] = [];

for (let i = 0; i < elves.length; i += 3) {
  const elf1 = elves[i];
  const elf2 = elves[i + 1];
  const elf3 = elves[i + 2];

  groups.push([elf1.split(""), elf2.split(""), elf3.split("")]);
}

let sharedItems: string[] = [];

for (const group of groups) {
  const [elf1, elf2, elf3] = group;

  for (const item of elf1) {
    if (elf2.includes(item) && elf3.includes(item)) {
      sharedItems.push(item);
      break;
    }
  }
}

const duplicateItemsAsValues = sharedItems.map((item) => {
  return alphabet.indexOf(item) + 1;
});

console.log(duplicateItemsAsValues.reduce((a, b) => a + b));
