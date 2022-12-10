import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 13140;
  // Act
  const actual = await sut.process('./10/01/test.txt');
  // Assert
  expect(actual).toBe(expected);
});
