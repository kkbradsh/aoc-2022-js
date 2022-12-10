import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const moves = ['R 4', 'U 4', 'L 3', 'D 1', 'R 4', 'D 1', 'L 5', 'R 2'];
  const expected = 1;
  // Act
  const actual = await sut.processInput(moves);
  // Assert
  expect(actual).toBe(expected);
});

test('process returns expected result with different test input', async () => {
  // Arrange
  const moves = ['R 5', 'U 8', 'L 8', 'D 3', 'R 17', 'D 10', 'L 25', 'U 20'];
  const expected = 36;
  // Act
  const actual = await sut.processInput(moves);
  // Assert
  expect(actual).toBe(expected);
});
