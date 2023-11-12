const input = Bun.file("input.txt");

const data = await input.text();

const elves = data.split("\n\n").map((elf, i) => {
  const cookiesArray = elf.split("\n").map((cookie) => Number(cookie));

  return {
    id: i,
    totalCalories: cookiesArray.reduce((acc, cur) => acc + cur, 0),
  };
});

const maxCalories = Math.max(...elves.map((elf) => elf.totalCalories));

const topThreeElves = elves
  .sort((a, b) => b.totalCalories - a.totalCalories)
  .slice(0, 3);

console.log(topThreeElves.reduce((acc, cur) => acc + cur.totalCalories, 0));
