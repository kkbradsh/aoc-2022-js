import { readTextFile } from '../../utils/file';

const scoreUp = (input, x, y) => {
  const height = input[y][x];
  let score = 0;
  for (let yU = y - 1; yU >= 0; yU--) {
    const nextHeight = input[yU][x];
    if (nextHeight < height) {
      score = score + 1;
    } else if (nextHeight >= height) {
      score = score + 1;
      break;
    }
  }
  return score;
};

const scoreDown = (input, x, y) => {
  const height = input[y][x];
  let score = 0;
  for (let yD = y + 1; yD < input.length; yD++) {
    const nextHeight = input[yD][x];
    if (nextHeight < height) {
      score = score + 1;
    } else if (nextHeight >= height) {
      score = score + 1;
      break;
    }
  }
  return score;
};

const scoreLeft = (input, x, y) => {
  const height = input[y][x];
  let score = 0;
  for (let xL = x - 1; xL >= 0; xL--) {
    const nextHeight = input[y][xL];
    if (nextHeight < height) {
      score = score + 1;
    } else if (nextHeight >= height) {
      score = score + 1;
      break;
    }
  }
  return score;
};

const scoreRight = (input, x, y) => {
  const height = input[y][x];
  let score = 0;
  for (let xR = x + 1; xR < input[y].length; xR++) {
    const nextHeight = input[y][xR];
    if (nextHeight < height) {
      score = score + 1;
    } else if (nextHeight >= height) {
      score = score + 1;
      break;
    }
  }
  return score;
};

const findMaxScore = (input) => {
  let max = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const score =
        scoreUp(input, x, y) *
        scoreRight(input, x, y) *
        scoreDown(input, x, y) *
        scoreLeft(input, x, y);
      if (score > max) max = score;
    }
  }
  return max;
};

const parseInput = (input) => {
  const map = [];
  for (let i = 0; i < input.length; i++) {
    map.push(input[i].split(''));
  }
  return map;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  const map = parseInput(input);
  return findMaxScore(map);
};
