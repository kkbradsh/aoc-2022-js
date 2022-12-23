import { readTextFile } from '../../utils/file';

const POSITIONS = new Map([
  ['N', [-1, 0]],
  ['NE', [-1, 1]],
  ['E', [0, 1]],
  ['SE', [1, 1]],
  ['S', [1, 0]],
  ['SW', [1, -1]],
  ['W', [0, -1]],
  ['NW', [-1, -1]],
]);

const DIRECTIONS = [
  ['N', ['N', 'NE', 'NW']],
  ['S', ['S', 'SE', 'SW']],
  ['W', ['W', 'NW', 'SW']],
  ['E', ['E', 'NE', 'SE']],
];

const move = (map) => {
  let round = 0;
  let needMove = true;
  let direction = 0;
  while (needMove) {
    // Propose Moves
    const proposedMoves = [];
    for (let key of map.keys()) {
      const elf = key;
      const [row, col] = elf.split(',').map((item) => Number(item));
      // Need to move? Elves in one of 8 directions.
      const relElves = [...POSITIONS].reduce((arr, [key, [relRow, relCol]]) => {
        if (map.has(`${row + relRow},${col + relCol}`)) {
          arr.push(key);
        }
        return arr;
      }, []);
      // Propose move (starting from preferred direction, but checking all directions)
      if (relElves.length === 0) continue;
      for (let i = 0; i < DIRECTIONS.length; i++) {
        const next = (direction + i) % DIRECTIONS.length;
        const [nextDirection, nextPositions] = DIRECTIONS[next];
        const foundElves = nextPositions.filter((relElf) => {
          return relElves.includes(relElf);
        });
        if (foundElves.length === 0) {
          const [relRow, relCol] = POSITIONS.get(nextDirection);
          proposedMoves.push([
            row,
            col,
            row + relRow,
            col + relCol,
            nextDirection,
          ]);
          break;
        }
      }
    }
    // Remove duplicate moves
    const destinations = proposedMoves.map(
      ([_fromRow, _fromCol, toRow, toCol, _direction]) => [toRow, toCol]
    );
    const finalMoves = proposedMoves.filter((move) => {
      const [_fromRow, _fromCol, toRow, toCol, _direction] = move;
      const foundDestination = destinations.filter(([row, col]) => {
        return row === toRow && col === toCol;
      });
      if (foundDestination.length === 1) return true;
    });
    // Move elves
    if (finalMoves.length === 0) needMove = false;
    else {
      finalMoves.forEach(([fromRow, fromCol, toRow, toCol, _direction]) => {
        map.delete(`${fromRow},${fromCol}`);
        map.set(`${toRow},${toCol}`);
      });
    }
    round = round + 1;
    // Choose next preferred direction
    direction = (direction + 1) % DIRECTIONS.length;
  }
  return round;
};

const parseInput = (input) => {
  const map = new Map();
  for (let row = 0; row < input.length; row++) {
    const cols = input[row].split('');
    for (let col = 0; col < cols.length; col++) {
      if (input[row][col] === '#') map.set(`${row + 1},${col + 1}`);
    }
  }
  return map;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  const map = parseInput(input);
  return move(map);
};
