// Write a test function to test all your functions
// Store all test cases in an array and pass to the test function
// Test function should return all failed test cases

// // [functionName, parameters, expected]
// const testCases = [
//   [add, [5, 5], 10],
//   [sub, [10, 3], 23]
// ];

// test(testCases);
// // [functionName, parameters, expected, actual]
// // [[function: sub], [10, 3], 23, 7];

const add = function (number1, number2) {
  return number1 + number2;
};

const sub = function (number1, number2) {
  return number1 - number2;
};

// ********************************Approach 1**********************************
const areOutputsNotEqual = function (actualOutput, expectedOutput) {
  return actualOutput !== expectedOutput;
};

function test1(testCases) {
  const failed = [];

  for (const [func, inputs, expectedOutput] of testCases) {
    const actualOutput = func(...inputs);

    if (areOutputsNotEqual(actualOutput, expectedOutput)) {
      failed.push([func, inputs, expectedOutput, actualOutput]);
    }
  }

  console.table(failed);
}

// ********************************Approach 2**********************************
const evaluateOutputs = function ([func, inputs, expectedOutput]) {
  const actualOutput = func(...inputs);

  return actualOutput !== expectedOutput;
};

const test2 = function (testCases) {
  const failed = testCases.filter(evaluateOutputs);

  console.table(failed);
};


const testCases = [
  [add, [2, 3], 5],
  [add, [7, 4], 11],
  [sub, [7, 4], 4]
];

// test1(testCases);
test2(testCases);