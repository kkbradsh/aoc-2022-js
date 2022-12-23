import { readTextFile } from '../../utils/file';

export const parseInput = (input) => {
  const numbers = {};
  const formulas = [];
  for (let i = 0; i < input.length; i++) {
    const [monkey, job] = input[i].split(': ');
    if (monkey === 'humn') continue;
    const parts = job.split(' ');
    if (parts.length === 1) {
      numbers[monkey] = Number(parts[0]);
    } else {
      formulas.push([
        monkey,
        parts[0],
        monkey === 'root' ? '=' : parts[1],
        parts[2],
      ]);
    }
  }
  return [numbers, formulas];
};

export const process = async (file) => {
  const input = await readTextFile(file);
  const [numbers, formulas] = parseInput(input);
  // Substitute numbers for formulas
  let somethingChanged = true;
  while (somethingChanged) {
    somethingChanged = false;
    for (let i = 0; i < formulas.length; i++) {
      const [monkey, part1, op, part2] = formulas[i];
      if (isNaN(part1)) {
        if (numbers[part1] !== undefined) {
          formulas[i][1] = numbers[part1];
          somethingChanged = true;
        }
      }
      if (isNaN(part2)) {
        if (numbers[part2] !== undefined) {
          formulas[i][3] = numbers[part2];
          somethingChanged = true;
        }
      }
      if (!isNaN(formulas[i][1]) && !isNaN(formulas[i][3])) {
        const value = eval(`${formulas[i][1]} ${op} ${formulas[i][3]}`);
        numbers[monkey] = value;
        formulas.splice(i, 1);
        somethingChanged = true;
        break;
      }
    }
  }
  // Figure out root's value and work backwards
  const [root, part1, op, part2] = formulas.find((item) => {
    return item[0] === 'root';
  });
  if (root !== 'root' || op !== '=')
    console.log('Something went wrong. Expected root monkey and equality');
  let monkey = isNaN(part1) ? part1 : part2;
  let value = !isNaN(part1) ? part1 : part2;
  while (true) {
    const [nextMonkey, nextPart1, nextOp, nextPart2] = formulas.find((item) => {
      return item[0] === monkey;
    });
    if (!nextMonkey) {
      console.log(
        `Something went wrong. Couldn't find ${monkey} in ${formulas}`
      );
      break;
    }
    if (nextOp === '+') {
      if (
        (isNaN(nextPart1) && !isNaN(nextPart2)) ||
        (isNaN(nextPart2) && !isNaN(nextPart1))
      ) {
        monkey = isNaN(nextPart1) ? nextPart1 : nextPart2;
        value = value - Number(!isNaN(nextPart1) ? nextPart1 : nextPart2);
      } else {
        console.log(
          `Unexpected addition: ${nextMonkey}, ${nextPart1}, ${nextOp}, ${nextPart2}`
        );
        break;
      }
    } else if (nextOp === '-') {
      if (isNaN(nextPart1) && !isNaN(nextPart2)) {
        monkey = nextPart1;
        value = value + nextPart2;
      } else if (!isNaN(nextPart1) && isNaN(nextPart2)) {
        monkey = nextPart2;
        value = (value - nextPart1) * -1;
      } else {
        console.log(
          `Unexpected subtraction: ${nextMonkey}, ${nextPart1}, ${nextOp}, ${nextPart2}`
        );
        break;
      }
    } else if (nextOp === '*') {
      if (
        (isNaN(nextPart1) && !isNaN(nextPart2)) ||
        (isNaN(nextPart2) && !isNaN(nextPart1))
      ) {
        monkey = isNaN(nextPart1) ? nextPart1 : nextPart2;
        value = value / Number(!isNaN(nextPart1) ? nextPart1 : nextPart2);
      } else {
        console.log(
          `Unexpected multiplication: ${nextMonkey}, ${nextPart1}, ${nextOp}, ${nextPart2}`
        );
        break;
      }
    } else if (nextOp === '/') {
      if (isNaN(nextPart1) && !isNaN(nextPart2)) {
        monkey = nextPart1;
        value = value * nextPart2;
      } else if (!isNaN(nextPart1) && isNaN(nextPart2)) {
        monkey = nextPart2;
        value = value / nextPart1;
      } else {
        console.log(
          `Unexpected division: ${nextMonkey}, ${nextPart1}, ${nextOp}, ${nextPart2}`
        );
        break;
      }
    } else {
      console.log(
        `Unexpected op: ${nextMonkey}, ${nextPart1}, ${nextOp}, ${nextPart2}`
      );
      break;
    }
    if (monkey === 'humn') break;
  }
  return monkey === 'humn' ? value : 0;
};
