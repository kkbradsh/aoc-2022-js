import { readTextFile } from '../../utils/file';
import { parseArrayIntoGroupedSummary } from '../../utils/array'

export const process = async (file) => {
  // get input
  const input = await readTextFile(file);
  // sum calories per elf
  let caloriesPerElf = parseArrayIntoGroupedSummary(input);
  // return max
  return Math.max(...caloriesPerElf);
};
