import { readTextFile } from '../../utils/file';

const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;

const DIRECTION = [RIGHT, DOWN, LEFT, UP];

const ROTATE = {
  L: -1,
  R: 1,
};

const move = (map, row, col, facing, steps) => {
  let nextRow = row;
  let nextCol = col;

  if ([LEFT, RIGHT].includes(facing)) {
    let canMove = true;
    let nextPossCol = nextCol;
    let accSteps = 0;
    while (canMove) {
      nextPossCol = nextPossCol + (facing === RIGHT ? 1 : -1);
      if (nextPossCol < 0) nextPossCol = map[row].length - 1;
      if (nextPossCol > map[row].length - 1) nextPossCol = 0;
      const nextPos = map[row][nextPossCol];
      if (nextPos === ' ') {
        continue;
      } else if (nextPos === '#') {
        canMove = false;
      } else if (nextPos === '.') {
        nextCol = nextPossCol;
        accSteps = accSteps + 1;
        if (accSteps === steps) canMove = false;
      }
    }
  } else if ([UP, DOWN].includes(facing)) {
    let canMove = true;
    let nextPossRow = nextRow;
    let accSteps = 0;
    while (canMove) {
      nextPossRow = nextPossRow + (facing === DOWN ? 1 : -1);
      if (nextPossRow < 0) nextPossRow = map.length - 1;
      if (nextPossRow > map.length - 1) nextPossRow = 0;
      const nextPos = map[nextPossRow][nextCol];
      if (nextPos === ' ') {
        continue;
      } else if (nextPos === '#') {
        canMove = false;
      } else if (nextPos === '.') {
        nextRow = nextPossRow;
        accSteps = accSteps + 1;
        if (accSteps === steps) canMove = false;
      }
    }
  } else {
    console.log(`should not get here: facing ${facing}`);
  }

  return [nextRow, nextCol];
};

const parseDirections = (input) => {
  const directions = [];
  const LR = ['L', 'R'];
  for (let i = 0; i < input.length; i++) {
    const next = input[i];
    if (
      LR.includes(next) ||
      (directions.length > 0 && LR.includes(directions[directions.length - 1]))
    ) {
      directions.push(next);
    } else {
      if (directions.length === 0) {
        directions.push(next);
      } else {
        directions[directions.length - 1] =
          directions[directions.length - 1] + next;
      }
    }
  }
  return directions;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  const map = input.slice(0, input.length - 2).map((item) => item.split(''));
  const directions = parseDirections(input[input.length - 1]);
  let row = 0;
  let col = map[0].findIndex((col) => col !== ' ');
  let facing = 0;
  for (let i = 0; i < directions.length; i++) {
    const next = directions[i];
    if (['L', 'R'].includes(next)) {
      facing = facing + ROTATE[next];
      facing = facing >= 0 ? facing : DIRECTION.length + facing;
      facing = facing % DIRECTION.length;
    } else {
      const steps = Number(next);
      [row, col] = move(map, row, col, facing, steps);
    }
  }
  return 1000 * (row + 1) + 4 * (col + 1) + facing;
};
