import { readTextFile } from '../../utils/file';

export const process = async (file) => {
  const input = await readTextFile(file);
  let priorities = [];
  for (let i = 0; i < input.length; i++) {
    // Get compartments
    const compartment1 = input[i].substring(0, input[i].length / 2);
    const compartment2 = input[i].substring(input[i].length / 2);
    // Find priorities
    let common = '';
    for (let j = 0; j < compartment1.length; j++) {
      const char = compartment1[j];
      if (compartment2.includes(char) && !common.includes(char))
        common = common + char;
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
