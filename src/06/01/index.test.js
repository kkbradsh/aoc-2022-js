import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 7;
  // Act
  const actual = await sut.findMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb');
  // Assert
  expect(actual).toBe(expected);
});

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 5;
  // Act
  const actual = await sut.findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz');
  // Assert
  expect(actual).toBe(expected);
});

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 6;
  // Act
  const actual = await sut.findMarker('nppdvjthqldpwncqszvftbrmjlhg');
  // Assert
  expect(actual).toBe(expected);
});

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 10;
  // Act
  const actual = await sut.findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg');
  // Assert
  expect(actual).toBe(expected);
});

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 11;
  // Act
  const actual = await sut.findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw');
  // Assert
  expect(actual).toBe(expected);
});
