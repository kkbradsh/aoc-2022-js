import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = [
    '##..##..##..##..##..##..##..##..##..##..',
    '###...###...###...###...###...###...###.',
    '####....####....####....####....####....',
    '#####.....#####.....#####.....#####.....',
    '######......######......######......####',
    '#######.......#######.......#######.....',
  ];
  // Act
  const actual = await sut.process('./10/02/test.txt');
  // Assert
  expect(actual).toEqual(expected);
});
