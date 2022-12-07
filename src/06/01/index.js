import { readTextFile } from '../../utils/file';

export const findMarker = (line) => {
  const MARKER_LENGTH = 4;
  for (let i = MARKER_LENGTH; i < line.length; i++) {
    const marker = line.substring(i - MARKER_LENGTH, i).split('');
    const markerSet = new Set(marker);
    if (markerSet.size === MARKER_LENGTH) return i;
  }
};

export const process = async (file) => {
  const input = await readTextFile(file);
  return findMarker(input[0]);
};
