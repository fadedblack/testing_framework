const areEqual = function (value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false;
    }

    return value1.every((element, index) => areEqual(element, value2[index]));
  }

  if (typeof value1 === "object") {
    return areEqual(
      Object.entries(value1).sort(),
      Object.entries(value2).sort()
    );
  }

  return value1 === value2;
};

// ********************************TESTING**********************************

const evaluateOutputs = function ([func, inputs, expectedOutput]) {
  const actualOutput = func(...inputs);

  return actualOutput !== expectedOutput;
};

const test = function (testCases) {
  const failed = testCases.filter(evaluateOutputs);

  console.table(failed);
};

// test for numbers and arrays
const arrayAndNumberTestCases = [
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

// test for objects
const objectTestCases = [
  // test for unequal objects
  [
    areEqual,
    [
      { name: "inkeet", age: 20 },
      { name: "faded", age: 5 },
    ],
    false,
  ],
  // test for equal objects
  [
    areEqual,
    [
      { name: "inkeet", age: 20 },
      { name: "inkeet", age: 20 },
    ],
    true,
  ],
  // test for two unequal array attribute
  [
    areEqual,
    [
      { name: "inkeet", age: [20] },
      { name: "inkeet", age: [19] },
    ],
    false,
  ],
  // test for two equal array attribute
  [
    areEqual,
    [
      { name: "inkeet", age: [20] },
      { name: "inkeet", age: [20] },
    ],
    true,
  ],
  // test for two unequal object attribute
  [
    areEqual,
    [
      { name: "inkeet", age: { indian: 20, western: 30 } },
      { name: "inkeet", age: { indian: 34, western: 59 } },
    ],
    false,
  ],
  // test for two equal object attributes
  [
    areEqual,
    [
      { name: "inkeet", age: { indian: 20, western: 30 } },
      { name: "inkeet", age: { indian: 20, western: 30 } },
    ],
    true,
  ],
  // test for two unequal object and array attributes
  [
    areEqual,
    [
      { name: "inkeet", age: { indian: 20, western: 30 }, hobby: ["reading"] },
      { name: "inkeet", age: { indian: 20, western: 30 }, hobby: ["sleeping"] },
    ],
    false,
  ],
  // test for two equal object and array attributes
  [
    areEqual,
    [
      { name: "inkeet", age: { indian: 20, western: 30 }, hobby: ["reading"] },
      { name: "inkeet", age: { indian: 20, western: 30 }, hobby: ["reading"] },
    ],
    true,
  ],
];

test(arrayAndNumberTestCases);

test(objectTestCases);
