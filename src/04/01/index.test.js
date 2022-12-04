import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 2;
  // Act
  const actual = await sut.process('./04/01/test.txt');
  // Assert
  expect(actual).toBe(expected);
});

test('process returns expected result with final input', async () => {
  // Arrange
  const expected = 490;
  // Act
  const actual = await sut.process('./04/01/final.txt');
  // Assert
  expect(actual).toBe(expected);
});
