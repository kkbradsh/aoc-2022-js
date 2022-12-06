import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 'CMZ';
  // Act
  const actual = await sut.process('./05/01/test.txt');
  // Assert
  expect(actual).toBe(expected);
});

