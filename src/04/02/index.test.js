import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 4;
  // Act
  const actual = await sut.process('./04/02/test.txt');
  // Assert
  expect(actual).toBe(expected);
});

test('process returns expected result with final input', async () => {
  // Arrange
  const expected = 921;
  // Act
  const actual = await sut.process('./04/02/final.txt');
  // Assert
  expect(actual).toBe(expected);
});
