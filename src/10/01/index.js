import { readTextFile } from '../../utils/file';

const processInput = (input) => {
  const cycles = [1];
  for (let i = 0; i < input.length; i++) {
    // parse input
    if (input[i] === 'noop') input[i] = 'noop 0';
    const [op, stringValue] = input[i].split(' ');
    const value = Number(stringValue);
    let x = cycles[cycles.length - 1];
    // execute
    if (op === 'addx') cycles.push(x); // first cycle is execution time, no change to x
    x = x + value;
    cycles.push(x);
  }
  // Return 20th, 60th, 100th, 140th, 180th, 220th cycle
  let sum = 0;
  for (let i = 20; i < cycles.length; i = i + 40) {
    sum = sum + i * cycles[i - 1];
  }
  return sum;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  return processInput(input);
};
