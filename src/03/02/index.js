import { readTextFile } from '../../utils/file';

export const process = async (file) => {
  const input = await readTextFile(file);
  let priorities = [];
  for (let i = 0; i < input.length; i = i + 3) {
    // Get elves
    const elf1 = input[i + 0];
    const elf2 = input[i + 1];
    const elf3 = input[i + 2];
    // Find priorities
    let common12 = '';
    for (let j = 0; j < elf1.length; j++) {
      if (elf2.includes(elf1[j]) && !common12.includes(elf1[j]))
        common12 = common12 + elf1[j];
    }
    let common = '';
    for (let j = 0; j < common12.length; j++) {
      if (elf3.includes(common12[j]) & !common.includes[common12[j]]) {
        common = common + common12[j];
      }
    }
    priorities.push(common);
  }
  // Sum priorities
  // ascii value of 'A' is 65, priorities of A-Z is 27 - 52
  // ascii value of 'a' is 97, a-z is 1 - 26
  return priorities.reduce((sum, item) => {
    if (item == item.toLowerCase()) {
      return sum + item.charCodeAt(0) - 97 + 1;
    } else {
      return sum + item.charCodeAt(0) - 65 + 27;
    }
  }, 0);
};
