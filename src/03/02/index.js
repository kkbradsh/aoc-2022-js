import { readTextFile } from '../../utils/file';

export const process = async (file) => {
  const input = await readTextFile(file);
  let priorities = [];
  for (let i = 0; i < input.length; i = i + 3) {
    // Get compartments
    const compartment1 = input[i + 0];
    const compartment2 = input[i + 1];
    const compartment3 = input[i + 2];
    // Find priorities
    let common12 = '';
    for (let j = 0; j < compartment1.length; j++) {
      const char = compartment1[j];
      if (compartment2.includes(char) && !common12.includes(char))
        common12 = common12 + char;
    }
    let common = '';
    for (let j = 0; j < common12.length; j++) {
      const char = common12[j];
      if (compartment3.includes(char) & !common.includes(char)) {
        common = common + char;
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
