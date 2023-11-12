const input = Bun.file("input.txt");

const data = await input.text();

// A = Rock
// B = Paper
// C = Scissors

const movesKey = {
  A: { move: "A", beats: "C", losesTo: "B" },
  B: { move: "B", beats: "A", losesTo: "C" },
  C: { move: "C", beats: "B", losesTo: "A" },
} as const;

const moveValues = {
  A: 1,
  B: 2,
  C: 3,
} as const;

const rounds = data
  .split("\n")
  .map((round) => round.split(" ") as ["A" | "B" | "C", "X" | "Y" | "Z"]);

rounds.pop();

const outcomes = rounds.map((round) => {
  const [opponentMove, neededOutcome] = round;

  let myMove: "A" | "B" | "C";

  // x = lose
  // y = draw
  // z = win

  if (neededOutcome === "X") {
    myMove = movesKey[opponentMove].beats;
  } else if (neededOutcome === "Y") {
    myMove = opponentMove;
  } else {
    myMove = movesKey[opponentMove].losesTo;
  }

  let result: "win" | "lose" | "draw";

  if (myMove === opponentMove) {
    result = "draw";
  } else if (movesKey[myMove].beats === opponentMove) {
    result = "win";
  } else {
    result = "lose";
  }

  let score: number;

  if (result === "win") {
    score = moveValues[myMove] + 6;
  } else if (result === "lose") {
    score = moveValues[myMove];
  } else {
    score = moveValues[myMove] + 3;
  }

  return [opponentMove, myMove, score] as const;
});

const totalScore = outcomes.reduce((acc, outcome) => {
  return acc + outcome[2];
}, 0);

console.log(totalScore);
