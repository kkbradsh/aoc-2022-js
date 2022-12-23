import { readTextFile } from '../../utils/file';

const ROUNDS = 2022;
const LEFT_GAP = 2;
const BOTTOM_GAP = 3;
const RIGHT_COL = 6;
const BOTTOM_ROW = 0;
const LEFT = '<';
const DOWN = -1;
const ROCKS = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
];

const moveLeftRight = (map, rock, units, right_col) => {
  let movePossible = true;

  // Move rock left/right, if possible
  const newRock = [];
  for (let i = 0; i < rock.length; i++) {
    let [x, y] = rock[i];
    const newX = x + units;
    if (
      (map.has(y) && map.get(y)[newX] === '#') ||
      newX < 0 ||
      newX > right_col
    ) {
      movePossible = false;
      break;
    }
    newRock.push([newX, y]);
  }

  // Move possible?
  if (movePossible) {
    return newRock;
  }
  return rock;
};

const moveDown = (map, rock, units, bottomRow) => {
  let movePossible = true;

  // Move rock 1 down, if possible
  const newRock = [];
  for (let i = 0; i < rock.length; i++) {
    const [x, y] = rock[i];
    const newY = y + units;
    if ((map.has(newY) && map.get(newY)[x] === '#') || newY < bottomRow) {
      movePossible = false;
      break;
    }
    newRock.push([x, newY]);
  }

  // Move possible?
  if (movePossible) {
    return [newRock, movePossible];
  }
  return [rock, movePossible];
};

const positionRock = (rock, topRow, leftGap, bottomGap) => {
  const newRock = [];
  for (let i = 0; i < rock.length; i++) {
    const [x, y] = rock[i];
    const newY = y + topRow + bottomGap;
    const newX = x + leftGap;
    newRock.push([newX, newY]);
  }
  return newRock;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  const windDirection = input[0].split('');
  const map = new Map();
  let round = 0;
  let rockIndex = 0;
  let wd = 0;
  while (round < ROUNDS) {
    const rock = ROCKS[rockIndex];
    // Put rock in initial position
    let newRock = positionRock(rock, map.size, LEFT_GAP, BOTTOM_GAP);
    // Move in wind direction and down
    while (wd < windDirection.length) {
      newRock = moveLeftRight(
        map,
        newRock,
        windDirection[wd] === LEFT ? -1 : 1,
        RIGHT_COL
      );
      const [movedRock, moved] = moveDown(map, newRock, DOWN, BOTTOM_ROW);
      newRock = movedRock;
      // Next wind direction
      wd = wd + 1 >= windDirection.length ? 0 : wd + 1;
      // Last move?
      if (!moved) {
        // Add rock to map and capture new top row
        for (let i = 0; i < newRock.length; i++) {
          const [x, y] = newRock[i];
          if (!map.has(y)) map.set(y, '.'.repeat(RIGHT_COL + 1));
          const row = map.get(y);
          const newRow = row.substr(0, x) + '#' + row.substr(x + 1);
          map.set(y, newRow);
        }
        // Next rock
        break;
      }
    }
    // Increment rounds each rock until reach ROUNDS
    round++;
    // Next rock
    rockIndex = rockIndex + 1 >= ROCKS.length ? 0 : rockIndex + 1;
  }
  return map.size;
};
