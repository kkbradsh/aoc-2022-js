import { readTextFile } from '../../utils/file';

const MOVEMAP = {
  L: { x: -1, y: 0 },
  R: { x: +1, y: 0 },
  U: { x: 0, y: +1 },
  D: { x: 0, y: -1 },
};

export const processInput = (input) => {
  const moves = [[0, 0]];
  const knots = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  input.forEach((line) => {
    const [direction, distance] = line.split(' ');
    for (let i = 1; i <= distance; i++) {
      // Move Head
      let xH, yH, xT, yT;
      [xH, yH] = knots[0];
      xH = xH + 1 * MOVEMAP[direction].x;
      yH = yH + 1 * MOVEMAP[direction].y;
      knots[0] = [xH, yH];
      // Move Rest of Knots
      for (let j = 1; j < knots.length; j++) {
        [xT, yT] = knots[j];
        if (Math.abs(xH - xT) > 1 || Math.abs(yH - yT) > 1) {
          if (yH !== yT) {
            yT = yT + 1 * (yH > yT ? 1 : -1);
          }
          if (xH !== xT) {
            xT = xT + 1 * (xH > xT ? 1 : -1);
          }
          knots[j] = [xT, yT];
        }
        // Consider this Knot the Head of the next Knot
        xH = xT;
        yH = yT;
      }
      if (!moves.find(([x, y]) => x === xT && y === yT)) {
        moves.push([xT, yT]);
      }
    }
  });
  return moves.length;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  return processInput(input);
};
