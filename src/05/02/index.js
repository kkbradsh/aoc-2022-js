import { readTextFile } from '../../utils/file';

const parseStacks = (stacks, line) => {
  const SECTION_LENGTH = 4;
  // first time through
  if (stacks.length === 0) {
    for (let i = 0; i < line.length; i = i + SECTION_LENGTH) {
      stacks.push([]);
    }
  }
  // each time through
  for (let i = 0; i < line.length; i = i + SECTION_LENGTH) {
    const crate = line[i + 1];
    if (isNaN(crate) && crate !== '') stacks[i / SECTION_LENGTH].push(crate);
  }
};

const parseInstructions = (instructions, line) => {
  const [move, fromStack, toStack] = line
    .replace('move ', '')
    .replace('from ', '')
    .replace('to ', '')
    .split(' ');
  instructions.push([move, fromStack, toStack]);
};

const parseInput = (input) => {
  const stacks = [];
  const instructions = [];
  let doneWithStacks = false;
  input.forEach((line) => {
    if (line === '') {
      doneWithStacks = true;
    } else if (!doneWithStacks) {
      parseStacks(stacks, line);
    } else {
      parseInstructions(instructions, line);
    }
  });
  return { stacks, instructions };
};

const processStacks = (stacks, instructions) => {
  // Process instructions
  instructions.forEach(([move, fromStack, toStack]) => {
    const crates = [];
    for (let i = 0; i < move; i++) {
      const crate = stacks[fromStack - 1].shift();
      crates.push(crate);
    }
    for (let i = 0; i < move; i++) {
      const crate = crates.pop();
      stacks[toStack - 1].unshift(crate);
    }
  });
};

export const process = async (file) => {
  const input = await readTextFile(file);
  const { stacks, instructions } = parseInput(input);
  processStacks(stacks, instructions);
  // return top of the stacks
  let top = '';
  stacks.forEach((stack) => {
    top = top + stack.shift();
  });
  return top;
};
