import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 45000;
  // Act
  const actual = await sut.process('./01/02/test.txt');
  // Assert
  expect(actual).toBe(expected);
});
