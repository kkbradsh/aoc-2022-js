import { once } from 'events';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export const readTextFile = async (file) => {
  const output = [];

  const readInterface = createInterface({
    input: createReadStream(`./src/${file}`),
    crlfDelay: Infinity,
  });

  readInterface.on('line', (line) => {
    output.push(line);
  });

  await once(readInterface, 'close');

  return output;
};
