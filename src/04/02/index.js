import { readTextFile } from '../../utils/file';

export const process = async (file) => {
  const input = await readTextFile(file);
  // Process input
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    // Get sections
    const [first, second] = input[i].split(',');
    const [a, b] = first.split('-');
    const [c, d] = second.split('-');
    // Overlaps?
    if (
      (Number(a) <= Number(c) && Number(b) >= Number(c)) ||
      (Number(a) <= Number(d) && Number(b) >= Number(d)) ||
      (Number(c) <= Number(a) && Number(d) >= Number(a)) ||
      (Number(c) <= Number(b) && Number(d) >= Number(b))
    ) {
      count = count + 1;
    }
  }
  return count;
};
