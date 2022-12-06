import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 'MCD';
  // Act
  const actual = await sut.process('./05/02/test.txt');
  // Assert
  expect(actual).toBe(expected);
});
