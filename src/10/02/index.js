import { readTextFile } from '../../utils/file';

const WIDTH = 40;

const getPixel = (pos, register) => {
  const relPos = pos % WIDTH;
  const spriteFrom = register - 1;
  const spriteTo = register + 1;
  return relPos >= spriteFrom && relPos <= spriteTo ? '#' : '.';
};

const processInput = (input) => {
  const cycles = [1];
  const crt = [];
  for (let i = 0; i < input.length; i++) {
    // parse input
    if (input[i] === 'noop') input[i] = 'noop 0';
    const [op, stringValue] = input[i].split(' ');
    const value = Number(stringValue);
    let x = cycles[cycles.length - 1];
    // execute
    if (op === 'addx') {
      crt.push(getPixel(crt.length, x));
      cycles.push(x);
    }
    crt.push(getPixel(crt.length, x));
    x = x + value;
    cycles.push(x);
  }
  // Return screen
  const screen = [];
  for (let i = 0; i <= crt.length - WIDTH; i = i + WIDTH) {
    screen.push(crt.slice(i, i + WIDTH).join(''));
  }
  return screen;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  return processInput(input);
};
