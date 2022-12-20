import { readTextFile } from '../../utils/file';

const DIVIDER1 = [[2]];
const DIVIDER2 = [[6]];

const parseArray = (input) => {
  const arr = [];

  const str = Array.from(input);
  if (str[0] === '[') str.shift();
  if (str[str.length - 1] === ']') str.pop();
  if (str.length === 0) {
    arr.push([]);
    return arr;
  }

  let element = '';
  let brackets = 0;
  do {
    const char = str.shift();
    if (char === '[') brackets = brackets + 1;
    else if (char === ']') brackets = brackets - 1;

    if (char === ',' && !brackets) {
      arr.push(isNaN(element) ? parseArray(element) : Number(element));
      element = '';
    } else {
      element = element + char;
    }
    // Last element
    if (str.length === 0) {
      arr.push(isNaN(element) ? parseArray(element) : Number(element));
    }
  } while (str.length > 0);
  return arr;
};

const isOrdered = (input1, input2) => {
  for (let i = 0; i < input1.length; i++) {
    // If right has fewer elements, not ordered
    if (i > input2.length - 1) return false;

    const value1 = input1[i];
    const value2 = input2[i];

    // If both arrays
    if (Array.isArray(value1) && Array.isArray(value2)) {
      const ordered = isOrdered(value1, value2);
      if (ordered !== undefined) return ordered;
    }

    // If left is array
    if (Array.isArray(value1) && !Array.isArray(value2)) {
      const arr2 = [];
      arr2.push(value2);
      const ordered = isOrdered(value1, arr2);
      if (ordered !== undefined) return ordered;
    }

    // If right is array
    if (!Array.isArray(value1) && Array.isArray(value2)) {
      const arr1 = [];
      arr1.push(value1);
      const ordered = isOrdered(arr1, value2);
      if (ordered !== undefined) return ordered;
    }

    // If both integers
    if (!Array.isArray(value1) && !Array.isArray(value2)) {
      if (value1 > value2) return false;
      else if (value1 < value2) return true;
    }
  }

  if (
    Array.isArray(input1) &&
    Array.isArray(input2) &&
    input2.length > input1.length
  )
    return true;

  return undefined;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  // Parse
  const parsedInput = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== '') {
      parsedInput.push(parseArray(input[i]));
    }
  }
  parsedInput.push(DIVIDER1);
  parsedInput.push(DIVIDER2);

  // Sort
  while (true) {
    let didSomething = false;
    for (let i = 0; i < parsedInput.length - 1; i++) {
      const input1 = parsedInput[i];
      const input2 = parsedInput[i + 1];
      if (!isOrdered(input1, input2)) {
        parsedInput[i] = input2;
        parsedInput[i + 1] = input1;
        didSomething = true;
      }
    }
    if (!didSomething) break;
  }

  // Return signal
  let index1 = 0;
  let index2 = 0;
  for (let i = 0; i < parsedInput.length; i++) {
    if (parsedInput[i] === DIVIDER1) index1 = i + 1;
    if (parsedInput[i] === DIVIDER2) index2 = i + 1;
  }
  return index1 * index2;
};
