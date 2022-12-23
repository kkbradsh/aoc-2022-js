import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 26;
  // Act
  const actual = await sut.process('./15/01/test.txt', 10);
  // Assert
  expect(actual).toBe(expected);
});
