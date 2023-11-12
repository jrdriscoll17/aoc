const input = Bun.file("input.txt");

const data = await input.text();

let stringPairs = data.split("\n");
stringPairs.pop();

const pairs = stringPairs.map((line) => {
  const elves = line.split(",");

  return [elves[0].split("-"), elves[1].split("-")];
});

console.log(pairs);
