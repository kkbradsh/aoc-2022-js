import { readTextFile } from '../../utils/file';

const processMonkeys = (monkeys) => {
  const counts = monkeys.map((_) => 0);
  const monkeyMultiple = monkeys.reduce((multiple, item) => {
    return (multiple = item.divisibleBy * multiple);
  }, 1);

  // Process
  const NUM_ROUNDS = 10000;
  for (let round = 0; round < NUM_ROUNDS; round++) {
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];
      counts[i] = counts[i] + monkeys[i].items.length;
      while (monkey.items.length > 0) {
        const old = monkey.items.shift();
        const worry = eval(monkey.operation);
        const reducedWorry = worry % monkeyMultiple;
        const updateMonkey =
          reducedWorry % monkey.divisibleBy === 0
            ? monkey.trueMonkey
            : monkey.falseMonkey;
        monkeys[updateMonkey].items.push(reducedWorry);
      }
    }
  }

  // Return top 2 counts multiplied
  const max = counts.reduce(
    (max, item) => {
      max.sort((a, b) => a - b);
      if (item > max[0]) max[0] = item;
      return max;
    },
    [0, 0]
  );
  return max[0] * max[1];
};

const parseInput = (input) => {
  const monkeys = [];

  for (let i = 0; i < input.length; i++) {
    const line = input[i].trim();
    if (line.startsWith('Monkey')) {
      monkeys.push({
        items: [],
        operation: '',
        operationSplit: [],
        divisibleBy: 1,
        trueMonkey: null,
        falseMonkey: null,
      });
    } else if (line.startsWith('Starting items')) {
      monkeys[monkeys.length - 1].items = line
        .replace('Starting items: ', '')
        .split(', ')
        .map((item) => Number(item));
    } else if (line.startsWith('Operation')) {
      monkeys[monkeys.length - 1].operation = line.replace(
        'Operation: new = ',
        ''
      );
      monkeys[monkeys.length - 1].operationSplit = line
        .replace('Operation: new = ', '')
        .split(' ');
    } else if (line.startsWith('Test')) {
      monkeys[monkeys.length - 1].divisibleBy = Number(
        line.replace('Test: divisible by ', '')
      );
    } else if (line.startsWith('If true')) {
      monkeys[monkeys.length - 1].trueMonkey = Number(
        line.replace('If true: throw to monkey ', '')
      );
    } else if (line.startsWith('If false')) {
      monkeys[monkeys.length - 1].falseMonkey = Number(
        line.replace('If false: throw to monkey ', '')
      );
    }
  }
  return monkeys;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  const monkeys = parseInput(input);
  return processMonkeys(monkeys);
};
