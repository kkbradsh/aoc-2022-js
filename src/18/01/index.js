import { readTextFile } from '../../utils/file';

const NEARBY = [
  [0, 1, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
];

export const process = async (file) => {
  const input = await readTextFile(file);
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    const [xC, yC, zC] = input[i].split(',');
    const x = Number(xC);
    const y = Number(yC);
    const z = Number(zC);
    NEARBY.forEach(([xD, yD, zD]) => {
      if (!input.includes(`${x + xD},${y + yD},${z + zD}`)) count = count + 1;
    });
  }
  return count;
};
