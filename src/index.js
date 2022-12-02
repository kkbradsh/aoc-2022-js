// Methods
const areArgumentsValid = (day, part) =>
  (day === '' && part === '') ||
  (Number(day) >= 1 && Number(day) <= 25 && (part === '1' || part === '2'));

const run = async (thisDay, thisPart) => {
  try {
    const code = require(`./${thisDay.padStart(2, 0)}/${thisPart.padStart(
      2,
      0
    )}`);
    const file = `./${thisDay.padStart(2, 0)}/${thisPart.padStart(
      2,
      0
    )}/final.txt`;
    return code.process(file);
  } catch {}
  return 'Not Implemented';
};

const figureOutWhatToRunAndRunIt = async (day, part) => {
  if (day === '' && part === '') {
    for (let d = 1; d <= 25; d++) {
      for (let p = 1; p <= 2; p++) {
        console.log(`${new Date()}: Start day ${d} part ${p}`);
        console.log(await run(String(d), String(p)));
        console.log(`${new Date()}: End day ${d} part ${p}`);
      }
    }
  } else {
    console.log(await run(String(day), String(part)));
  }
};

const main = () => {
  const myArgs = process.argv.slice(2);
  const day = (myArgs[0] || '').toLowerCase();
  const part = (myArgs[1] || '').toLowerCase();

  if (!areArgumentsValid(day, part)) {
    console.log('Usage:');
    console.log(
      '- To run a specific day, part with specific input file: `npm run start [day] [part]`'
    );
    console.log('day: enter day to run');
    console.log('part: enter part 1 or 2');
    console.log('Example: `npm run start 1 1`');
    console.log('- To run all days for part 1 and part 2: `npm run start`');
    console.log('Example: `npm run start`');
    process.exit(1);
  }

  figureOutWhatToRunAndRunIt(day, part);
};

// Execution
main();
