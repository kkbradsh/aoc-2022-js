import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 24933642;
  // Act
  const actual = await sut.process('./07/01/test.txt');
  // Assert
  expect(actual).toBe(expected);
});
