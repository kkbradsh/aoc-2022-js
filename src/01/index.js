import * as reader from '../utils/fileRead';

export const test = () => {};

export const processPart1 = async (file) => {
  const input = await reader.readTextFile(file);

  let elves = [];
  elves.push(0);
  for (let i = 0; i < input.length; i++) {
    if (input[i] == '') {
      elves.push(0);
    } else {
      elves[elves.length - 1] = elves[elves.length - 1] + Number(input[i]);
    }
  }

  return elves.reduce((max, item) => {
    if (item > max) return item;
    else return max;
  }, 0);
};

export const processPart2 = async (file) => {
  const input = await reader.readTextFile(file);

  let elves = [];
  elves.push(0);
  for (let i = 0; i < input.length; i++) {
    if (input[i] == '') {
      elves.push(0);
    } else {
      elves[elves.length - 1] = elves[elves.length - 1] + Number(input[i]);
    }
  }

  const max = [];
  for (let i = 0; i < 3; i++) {
    max.push(elves.pop());
  }
  elves.reduce((max, item) => {
    // find the smallest number in max
    let minIndex = 0;
    for (let i = 1; i < max.length; i++) {
      if (max[minIndex] > max[i]) minIndex = i;
    }
    // is item greater than the smallest
    if (item > max[minIndex]) max[minIndex] = item;
    return max;
  }, max);
  return max.reduce((sum, item) => sum + item, 0);
};
