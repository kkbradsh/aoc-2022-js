// Environment Variables
const TEST_AND_OR_EXEC = process.env.AOC_TEST_AND_OR_EXEC || 'exec'; // "test", "testexec" or "exec"

// Methods
const areArgumentsValid = (day, part, fileType) =>
  (day === '' && part === '' && fileType === '') ||
  (Number(day) >= 1 &&
    Number(day) <= 25 &&
    (part === '1' || part === '2') &&
    (fileType === 't' || fileType === 'f'));

const test = async (thisDay) => {
  const code = require(`./${thisDay.padStart(2, 0)}`);
  return code.test();
};

const run = async (thisDay, thisPart, thisFileType) => {
  const code = require(`./${thisDay.padStart(2, 0)}`);
  const file = `${thisDay.padStart(2, 0)}/${
    thisFileType === 't' ? 'test' : 'final'
  }${thisPart.padStart(2, 0)}.txt`;
  if (thisPart === '1') {
    return code.processPart1(file);
  }
  return code.processPart2(file);
};

const figureOutWhatToRunAndRunIt = async (day, part, fileType) => {
  if (day === '' && part === '' && fileType === '') {
    for (let d = 1; d <= 25; d++) {
      if (['test', 'testexec'].includes(TEST_AND_OR_EXEC.toLowerCase())) {
        console.log(`${new Date()}: Start day ${d}`);
        test(String(d));
      }
      for (let p = 1; p <= 2; p++) {
        if (['exec', 'testexec'].includes(TEST_AND_OR_EXEC.toLowerCase())) {
          console.log(`${new Date()}: Start day ${d} part ${p}`);
          console.log(await run(String(d), String(p), 'f'));
          console.log(`${new Date()}: End day ${d} part ${p}`);
        }
      }
    }
  } else {
    if (['test', 'testexec'].includes(TEST_AND_OR_EXEC.toLowerCase())) {
      test(String(day));
    }
    if (['exec', 'testexec'].includes(TEST_AND_OR_EXEC.toLowerCase())) {
      console.log(await run(String(day), String(part), String(fileType)));
    }
  }
};

const main = () => {
  const myArgs = process.argv.slice(2);
  const day = (myArgs[0] || '').toLowerCase();
  const part = (myArgs[1] || '').toLowerCase();
  const fileType = (myArgs[2] || '').toLowerCase();

  if (!areArgumentsValid(day, part, fileType)) {
    console.log('Usage:');
    console.log(
      '- To run a specific day, part with specific input file: `npm run start [day] [part] [file]`'
    );
    console.log('day: enter day to run');
    console.log('part: enter part 1 or 2');
    console.log('fileType: enter t for test or f for final');
    console.log('Example: `npm run start 1 1 t`');
    console.log(
      '- To run all days for part 1 and part 2 with final input files: `npm run start`'
    );
    console.log('Example: `npm run start`');
    process.exit(1);
  }

  figureOutWhatToRunAndRunIt(day, part, fileType);
};

// Execution
main();
