const input = Bun.file("input.txt");

let chars = await input.text();
chars = chars.split("\n")[0];

let numberProcessed = 0;

for (let i = 0; i < chars.length - 13; i++) {
  const message = chars.slice(i, i + 14).split("");
  const unique = new Set(message);

  if (unique.size === 14) {
    numberProcessed = i + 14;
    break;
  }
}

console.log(numberProcessed);
