export const processSubArrays = (input, method) => {
  const output = [];
  // process subarrays
  let subArray = [];
  for (let i = 0; i < input.length; i++) {
    // empty line indicates the end of a group
    if (input[i] === '') {
      output.push(method(subArray));
      subArray = [];
    }
    // last line indicates the end of a group
    else if (i === input.length - 1) {
      subArray.push(input[i]);
      output.push(method(subArray));
      subArray = [];
    } else subArray.push(input[i]);
  }
  return output;
};

export const unionArrays = (arrays) => {
  let union = arrays[0];
  for (let i = 1; i < arrays.length; i++) {
    const tempUnion = new Set([...union, ...arrays[i]]);
    union = tempUnion;
  }
  return [...union];
};

export const intersectArrays = (arrays) => {
  let intersection = new Set(arrays[0]);
  for (let i = 1; i < arrays.length; i++) {
    const tempSet = new Set(arrays[i]);
    const tempIntersection = new Set(
      [...intersection].filter((x) => tempSet.has(x)),
    );
    intersection = tempIntersection;
  }
  return [...intersection];
};

export const parseBags = (input) => {
  const bags = {};
  for (let line = 0; line < input.length; line++) {
    const words = input[line].split(' ');

    let outerBag = '';
    let foundOuterBag = false;

    let count = 0;
    let innerBag = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (!foundOuterBag) {
        if (word === 'bags') {
          // found end of outer bag
          bags[outerBag] = [];
        } else if (word === 'contain') {
          foundOuterBag = true;
        } else {
          outerBag = outerBag.concat(word);
        }
      } else { // found outer bag, now processing inner bags
        if (word === 'no') break; // bag doesn't contain any bags, end processing the line

        // eslint-disable-next-line no-restricted-globals
        if (!isNaN(word)) {
          count = Number(word);
        } else if (word.startsWith('bag')) {
          // found end of inner bag
          for (let k = 0; k < count; k++) {
            (bags[outerBag]).push(innerBag);
          }
          count = 0;
          innerBag = '';
        } else {
          innerBag = innerBag.concat(word);
        }
      }
    }
  }

  return bags;
};

const isBagFound = (bags, bagToFind, allBags) => {
  if (bags.includes(bagToFind)) return true;

  let found = null;
  for (let i = 0; found === null && i < bags.length; i++) {
    const innerBags = allBags[bags[i]];
    found = isBagFound(innerBags, bagToFind, allBags);
  }
  return found;
};

export const searchBags = (allBags, bagToFind) => {
  const foundBags = [];

  Object.keys(allBags).forEach((outerBag) => {
    const innerBags = allBags[outerBag];
    if (isBagFound(innerBags, bagToFind, allBags)) {
      foundBags.push(outerBag);
    }
  });

  return foundBags;
};

export const countBags = (bags, allBags) => {
  let count = 0;
  for (let i = 0; i < bags.length; i++) {
    count += 1; // count outer bag
    count += countBags(allBags[bags[i]], allBags); // count inner bags
  }
  return count;
};
