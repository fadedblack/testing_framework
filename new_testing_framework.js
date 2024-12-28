const areEqual = function (value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false;
    }

    return value1.every((element, index) => areEqual(element, value2[index]));
  }

  return value1 === value2;
};

// ********************************TESTING**********************************

const evaluateOutputs = function ([func, inputs, expectedOutput]) {
  const actualOutput = func(...inputs);

  return actualOutput !== expectedOutput;
};

const test2 = function (testCases) {
  const failed = testCases.filter(evaluateOutputs);

  console.table(failed);
};

const testCases = [
  // test for two equal arrays of same lengths
  [
    areEqual,
    [
      [1, 2, 3],
      [1, 2, 3],
    ],
    true,
  ],
  // test for two equal lengths but different arrays
  [
    areEqual,
    [
      [1, 2, 3],
      [1, 3, 2],
    ],
    false,
  ],
  // test for two unequal arrays of different lengths
  [
    areEqual,
    [
      [1, 2, 3],
      [1, 2],
    ],
    false,
  ],
  // test for one filled and one empty array
  [areEqual, [[1, 2, 3], []], false],
  // test for one array and not an array
  [areEqual, [[1, 2, 3], 2], false],
  // test for two unequal numbers
  [areEqual, [1, 2], false],
  // test for two equal numbers
  [areEqual, [1, 1], true],
  // test for unequal 2D array
  [
    areEqual,
    [
      [1, [2, 3]],
      [1, 2],
    ],
    false,
  ],
  // test for equal 2D array
  [
    areEqual,
    [
      [1, [2, 3]],
      [1, [2, 3]],
    ],
    true,
  ],
  // test for equal two 2D array
  [
    areEqual,
    [
      [
        [1, 1],
        [2, 3],
      ],
      [
        [1, 1],
        [2, 3],
      ],
    ],
    true,
  ],
  // test for unequal two 2D array
  [
    areEqual,
    [
      [
        [1, 4],
        [2, 3],
      ],
      [
        [1, 5],
        [2, 3],
      ],
    ],
    false,
  ],
  // test for unequal 3D array
  [
    areEqual,
    [
      [
        [1, [1, 2]],
        [2, 3],
      ],
      [
        [1, [1, 2]],
        [2, 3],
      ],
    ],
    true,
  ],
  // test for equal 3D array
  [
    areEqual,
    [
      [
        [1, [1, 2]],
        [2, 3],
      ],
      [
        [1, [1, 3]],
        [2, 3],
      ],
    ],
    false,
  ],
];

test2(testCases);
