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
    const [theirEncodedPlay, myEncodedOutcome] = input[i].split(' ');
    const theirPlay = ABC[theirEncodedPlay];
    const myOutcome = XYZ[myEncodedOutcome];
    let myPlay = '';
    for (let play in RUBRIC[theirPlay]) {
      if (RUBRIC[theirPlay][play] == myOutcome) {
        myPlay = play;
      }
    }
    score = score + SCORE[myPlay] + myOutcome;
  }
  return score;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  return playGame(input);
};
