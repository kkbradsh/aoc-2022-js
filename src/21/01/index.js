import { readTextFile } from '../../utils/file';

export const parseInput = (input) => {
  const numbers = {};
  const formulas = [];
  for (let i = 0; i < input.length; i++) {
    const [monkey, job] = input[i].split(': ');
    const parts = job.split(' ');
    if (parts.length === 1) {
      numbers[monkey] = Number(parts[0]);
    } else {
      formulas.push([monkey, parts[0], parts[1], parts[2]]);
    }
  }
  return [numbers, formulas];
};

export const process = async (file) => {
  const input = await readTextFile(file);
  const [numbers, formulas] = parseInput(input);
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
  return numbers['root'];
};
