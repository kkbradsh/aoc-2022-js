import { readTextFile } from '../../utils/file';

const NEARBY = [
  [0, 1, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
];

const findTouchingAir = (
  lava,
  touchingAir,
  airX,
  airY,
  airZ,
  minX,
  maxX,
  minY,
  maxY,
  minZ,
  maxZ
) => {
  let isTrapped = true; // assume true until proven false (hit the wall)
  for (let i = 0; i < NEARBY.length; i++) {
    const [moveX, moveY, moveZ] = NEARBY[i];
    const nearX = airX + moveX;
    const nearY = airY + moveY;
    const nearZ = airZ + moveZ;
    const nearCube = `${nearX},${nearY},${nearZ}`;
    if (
      nearX < minX ||
      nearX > maxX ||
      nearY < minY ||
      nearY > maxY ||
      nearZ < minZ ||
      nearZ > maxZ
    ) {
      isTrapped = false;
      break;
    } else if (!lava.includes(nearCube) && !touchingAir.includes(nearCube)) {
      touchingAir.push(nearCube);
      const nearbyIsTrapped = findTouchingAir(
        lava,
        touchingAir,
        nearX,
        nearY,
        nearZ,
        minX,
        maxX,
        minY,
        maxY,
        minZ,
        maxZ
      );
      if (!nearbyIsTrapped) isTrapped = false;
    }
  }
  return isTrapped;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  // Find min and max
  let xMin = input.length;
  let yMin = input.length;
  let zMin = input.length;
  let xMax = 0;
  let yMax = 0;
  let zMax = 0;
  for (let i = 0; i < input.length; i++) {
    const [x, y, z] = input[i].split(',').map((item) => Number(item));
    xMin = Math.min(xMin, x);
    yMin = Math.min(yMin, y);
    zMin = Math.min(zMin, z);
    xMax = Math.max(xMax, x);
    yMax = Math.max(yMax, y);
    zMax = Math.max(zMax, z);
  }
  // Find trapped air
  let trappedAir = [];
  let freeAir = [];
  for (let z = zMin; z <= zMax; z++) {
    for (let y = yMin; y <= yMax; y++) {
      for (let x = xMin; x <= xMax; x++) {
        const cube = `${x},${y},${z}`;
        if (
          !input.includes(cube) &&
          !freeAir.includes(cube) &&
          !trappedAir.includes(cube)
        ) {
          const touchingAir = [cube];
          const isTrapped = findTouchingAir(
            input,
            touchingAir,
            x,
            y,
            z,
            xMin,
            xMax,
            yMin,
            yMax,
            zMin,
            zMax
          );
          if (isTrapped) {
            trappedAir = trappedAir.concat(touchingAir);
          } else {
            freeAir = freeAir.concat(touchingAir);
          }
        }
      }
    }
  }
  // Return surface area
  let lavaSurfaceArea = 0;
  for (let i = 0; i < input.length; i++) {
    const [x, y, z] = input[i].split(',').map((item) => Number(item));
    NEARBY.forEach(([xD, yD, zD]) => {
      const cube = `${x + xD},${y + yD},${z + zD}`;
      if (!input.includes(cube) && !trappedAir.includes(cube))
        lavaSurfaceArea = lavaSurfaceArea + 1;
    });
  }
  return lavaSurfaceArea;
};
