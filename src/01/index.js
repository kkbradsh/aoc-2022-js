import * as reader from '../utils/fileRead';

const parseArrayIntoGroupedSummary = (input) => {
  let output = [];
  output.push(0);
  for (let i = 0; i < input.length; i++) {
    if (input[i] == '') {
      output.push(0);
    } else {
      output[output.length - 1] = output[output.length - 1] + Number(input[i]);
    }
  }
  return output;
};

export const test = () => {};

export const processPart1 = async (file) => {
  const input = await reader.readTextFile(file);

  // sum calories per elf
  let elves = parseArrayIntoGroupedSummary(input);

  // return max
  return Math.max(...elves);
};

export const processPart2 = async (file) => {
  const input = await reader.readTextFile(file);

  // sum calories per elf
  let elves = parseArrayIntoGroupedSummary(input);

  const max = [];
  for (let i = 0; i < elves.length; i++) {
    if (i < 3) {
      // initialize max with first 3 values
      max.push(elves[i]);
    } else {
      // sort to find the smallest number in max
      max.sort((a, b) => a - b);
      // replace with new value if greater than the smallest in max
      if (elves[i] > max[0]) max[0] = elves[i];
    }
  }

  // return sum of top 3
  return max.reduce((sum, item) => sum + item, 0);
};
