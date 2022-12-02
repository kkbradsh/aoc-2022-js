import * as reader from '../../utils/fileRead';

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

export const process = async (file) => {
  const input = await reader.readTextFile(file);

  // sum calories per elf
  let elves = parseArrayIntoGroupedSummary(input);

  // return max
  return Math.max(...elves);
};
