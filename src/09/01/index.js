import { readTextFile } from '../../utils/file';

const MOVEMAP = {
  L: { x: -1, y: 0 },
  R: { x: +1, y: 0 },
  U: { x: 0, y: -1 },
  D: { x: 0, y: +1 },
};

export const process = async (file) => {
  const input = await readTextFile(file);
  // Process input
  const moves = ['0,0'];
  let xH = 0;
  let yH = 0;
  let xT = 0;
  let yT = 0;
  input.forEach((line) => {
    const [direction, distance] = line.split(' ');
    for (let i = 1; i <= distance; i++) {
      // Move Head
      xH = xH + 1 * MOVEMAP[direction].x;
      yH = yH + 1 * MOVEMAP[direction].y;
      // Move Tail
      if (Math.abs(xH - xT) > 1 || Math.abs(yH - yT) > 1) {
        if (
          (['L', 'R'].includes(direction) && yH === yT) ||
          (['U', 'D'].includes(direction) && xH === xT)
        ) {
          // horizontal or vertical move
          xT = xT + 1 * MOVEMAP[direction].x;
          yT = yT + 1 * MOVEMAP[direction].y;
        } else {
          // TODO: diagonal move
          xT = xT + (xH > xT ? 1 : -1);
          yT = yT + (yH > yT ? 1 : -1);
        }
        const move = `${xT},${yT}`;
        if (!moves.includes(move)) {
          moves.push(move);
        }
      }
    }
  });
  return moves.length;
};
