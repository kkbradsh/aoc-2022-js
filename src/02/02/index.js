import { readTextFile } from '../../utils/file';

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';

const LOSE = 0;
const DRAW = 3;
const WIN = 6;

const ABC = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
};

const XYZ = {
  X: LOSE,
  Y: DRAW,
  Z: WIN,
};

const SCORE = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const RUBRIC = {
  ROCK: {
    ROCK: DRAW,
    PAPER: WIN,
    SCISSORS: LOSE,
  },
  PAPER: {
    ROCK: LOSE,
    PAPER: DRAW,
    SCISSORS: WIN,
  },
  SCISSORS: {
    ROCK: WIN,
    PAPER: LOSE,
    SCISSORS: DRAW,
  },
};

const playGame = (input) => {
  let score = 0;
  for (let i = 0; i < input.length; i++) {
    const [theirMysteryGuess, myMysteryOutcome] = input[i].split(' ');
    const theirGuess = ABC[theirMysteryGuess];
    const myOutcome = XYZ[myMysteryOutcome];
    let myGuess = 0;
    for (let guess in RUBRIC[theirGuess]) {
      if (RUBRIC[theirGuess][guess] == myOutcome) {
        myGuess = guess;
      }
    }
    score = score + SCORE[myGuess] + myOutcome;
  }
  return score;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  return playGame(input);
};
