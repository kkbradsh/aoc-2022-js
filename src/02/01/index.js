import { readTextFile } from '../../utils/file';

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';

const ABC = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
};

const XYZ = {
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
};

const SCORE = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const LOSE = 0;
const DRAW = 3;
const WIN = 6;

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
    const [theirEncodedPlay, myEncodedPlay] = input[i].split(' ');
    const theirPlay = ABC[theirEncodedPlay];
    const myPlay = XYZ[myEncodedPlay];
    score = score + SCORE[myPlay] + RUBRIC[theirPlay][myPlay];
  }
  return score;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  return playGame(input);
};
