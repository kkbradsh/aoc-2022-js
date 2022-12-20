import { readTextFile } from '../../utils/file';

const XFIRST = 500;
const YFIRST = 0;

export const process = async (file) => {
  const input = await readTextFile(file);

  // Parse input
  let yMax = YFIRST;
  const map = new Map();
  for (let i = 0; i < input.length; i++) {
    const regex = new RegExp(' -> ', 'g');
    const stringValues = input[i].replace(regex, ' ').split(' ');
    for (let j = 0; j < stringValues.length - 1; j++) {
      const [fromX, fromY] = stringValues[j]
        .split(',')
        .map((item) => Number(item));
      const [toX, toY] = stringValues[j + 1]
        .split(',')
        .map((item) => Number(item));
      for (let y = Math.min(fromY, toY); y <= Math.max(fromY, toY); y++) {
        for (let x = Math.min(fromX, toX); x <= Math.max(fromX, toX); x++) {
          yMax = Math.max(yMax, y);
          const coord = `${x},${y}`;
          if (!map.has(coord)) map.set(coord, 'rock');
        }
      }
    }
  }

  // Drop sand
  let sand = 0;
  let done = false;
  while (!done) {
    let x = XFIRST;
    let y = YFIRST;
    let moved = true;
    let coord;
    while (moved) {
      // Infinity?
      if (y > yMax) {
        moved = false;
        done = true;
        continue;
      }
      // Move down?
      coord = `${x},${y + 1}`;
      if (!map.has(coord)) {
        y = y + 1;
        continue;
      }
      // Else move diagonal down and to left
      coord = `${x - 1},${y + 1}`;
      if (!map.has(coord)) {
        x = x - 1;
        y = y + 1;
        continue;
      }
      // Else move diagonal down and to right
      coord = `${x + 1},${y + 1}`;
      if (!map.has(coord)) {
        x = x + 1;
        y = y + 1;
        continue;
      }
      // Final resting place
      map.set(`${x},${y}`, 'sand');
      sand = sand + 1;
      moved = false;
    }
  }

  return sand;
};
