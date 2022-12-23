import { readTextFile } from '../../utils/file';

const FINAL_YROW = 2000000;

export const process = async (file, yRow = FINAL_YROW) => {
  const input = await readTextFile(file);

  // Parse out sensors and beacons
  const sensors = [];
  const beacons = [];
  const notBeacons = new Map();
  for (let i = 0; i < input.length; i++) {
    const stringValues = input[i]
      .replace('Sensor at x=', '')
      .replace(' y=', '')
      .replace(': closest beacon is at x=', ',')
      .replace(' y=', '')
      .split(',');
    const [xS, yS, xB, yB] = stringValues.map((item) => Number(item));
    const manhattenValue = Math.abs(xS - xB) + Math.abs(yS - yB);
    sensors.push(`${xS},${yS},${manhattenValue}`);
    beacons.push(`${xB},${yB}`);
  }

  // Figure out how many positions on YROW will not contains beacons
  for (let i = 0; i < sensors.length; i++) {
    const [xS, yS, manhattenValue] = sensors[i]
      .split(',')
      .map((item) => Number(item));
    const hValue = manhattenValue - Math.abs(yS - yRow);
    if (hValue >= 0) {
      for (let j = hValue * -1; j <= hValue; j++) {
        const x = xS + j;
        const coord = `${x},${yRow}`;
        if (!beacons.includes(coord) && !notBeacons.has(coord)) {
          notBeacons.set(coord, null);
        }
      }
    }
  }
  return notBeacons.size;
};
