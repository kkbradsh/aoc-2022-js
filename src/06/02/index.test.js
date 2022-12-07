import * as sut from './index';

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 19;
  // Act
  const actual = await sut.findMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb');
  // Assert
  expect(actual).toBe(expected);
});

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 23;
  // Act
  const actual = await sut.findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz');
  // Assert
  expect(actual).toBe(expected);
});

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 23;
  // Act
  const actual = await sut.findMarker('nppdvjthqldpwncqszvftbrmjlhg');
  // Assert
  expect(actual).toBe(expected);
});

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 29;
  // Act
  const actual = await sut.findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg');
  // Assert
  expect(actual).toBe(expected);
});

test('process returns expected result with test input', async () => {
  // Arrange
  const expected = 26;
  // Act
  const actual = await sut.findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw');
  // Assert
  expect(actual).toBe(expected);
});
