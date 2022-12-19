import { readTextFile } from '../../utils/file';
import { dijkstra } from './dijkstra';

const parseInput = (input) => {
  const grid = [];
  let xStart, yStart, xEnd, yEnd;
  for (let row = 0; row < input.length; row++) {
    const intRow = [];
    for (let col = 0; col < input[row].length; col++) {
      let char = input[row][col];
      if (char === 'S') {
        xStart = col;
        yStart = row;
        char = 'a';
      } else if (char === 'E') {
        xEnd = col;
        yEnd = row;
        char = 'z';
      }
      intRow.push(char.charCodeAt(0));
    }
    grid.push(intRow);
  }
  return [grid, xStart, yStart, xEnd, yEnd];
};

export const process = async (file) => {
  const input = await readTextFile(file);
  const [grid, xStart, yStart, xEnd, yEnd] = parseInput(input);
  return dijkstra(grid, xStart, yStart, xEnd, yEnd);
};
