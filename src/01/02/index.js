import { readTextFile } from '../../utils/file';
import { parseArrayIntoGroupedSummary } from '../../utils/array';

export const process = async (file) => {
  // get input
  const input = await readTextFile(file);
  // sum calories per elf
  let caloriesPerElf = parseArrayIntoGroupedSummary(input);
  // sort decending
  caloriesPerElf.sort((first, second) => second - first);
  // return sum of top 3
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    sum = sum + caloriesPerElf[i];
  }
  return sum;
};
