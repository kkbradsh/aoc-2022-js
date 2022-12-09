import { readTextFile } from '../../utils/file';

const isVisibleUp = (input, x, y) => {
  const height = input[y][x];
  for (let yU = y - 1; yU >= 0; yU--) {
    if (input[yU][x] >= height) return false;
  }
  return true;
};

const isVisibleDown = (input, x, y) => {
  const height = input[y][x];
  for (let yD = y + 1; yD < input.length; yD++) {
    if (input[yD][x] >= height) return false;
  }
  return true;
};

const isVisibleLeft = (input, x, y) => {
  const height = input[y][x];
  for (let xL = x - 1; xL >= 0; xL--) {
    if (input[y][xL] >= height) return false;
  }
  return true;
};

const isVisibleRight = (input, x, y) => {
  const height = input[y][x];
  for (let xR = x + 1; xR < input[y].length; xR++) {
    if (input[y][xR] >= height) return false;
  }
  return true;
};

const findVisible = (input) => {
  // edges
  let count = input.length * 2 + input[0].length * 2 - 4;
  // inner
  for (let y = 1; y < input.length - 1; y++) {
    for (let x = 1; x < input[y].length - 1; x++) {
      if (
        isVisibleUp(input, x, y) ||
        isVisibleRight(input, x, y) ||
        isVisibleDown(input, x, y) ||
        isVisibleLeft(input, x, y)
      ) {
        count = count + 1;
      }
    }
  }
  return count;
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
  return findVisible(map);
};
