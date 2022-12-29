import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 58;
  // Act
  const actual = await sut.process('./18/02/test.txt');
  // Assert
  expect(actual).toBe(expected);
});
