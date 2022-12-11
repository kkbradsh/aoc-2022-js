import { readTextFile } from '../../utils/file';

const processMonkeys = (monkeys) => {
  const counts = monkeys.map((_) => 0);

  // Process
  for (let round = 0; round < 20; round++) {
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];
      while (monkey.items.length > 0) {
        const old = monkey.items.shift();
        const worry = Math.floor(eval(monkey.operation) / 3);
        if (worry % monkey.divisibleBy === 0) {
          monkeys[monkey.trueMonkey].items.push(worry);
        } else {
          monkeys[monkey.falseMonkey].items.push(worry);
        }
        counts[i] = counts[i] + 1;
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
