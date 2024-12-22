const range = function (from, to, jump) {
  const numbers = [];

  for (let i = from; i < to; i += jump) {
    numbers.push(i);
  }

  return numbers;
};
//************************************TABLE*************************************
const DASH = '━';
const BAR = '┃';
const SPACE = ' ';

const isEven = function (number) {
  return (number & 1) === 0;
};

const insertData = function (message, size) {
  const totalSpaces = size - message.toString().length;
  const padding = isEven(size) ? 0 : 1;

  const timesLeft = Math.floor(totalSpaces / 2);
  const timesRight = Math.ceil(totalSpaces / 2) + padding;

  return BAR + SPACE.repeat(timesLeft) + message + SPACE.repeat(timesRight);
};

// const addData1 = function (value) {
//   return insertData(value) +
//     '┃\n' + getBorder('┣', '╋', '┫', row.length, size) + '\n';
// };

const addData = function (values) {
  return values.map(function (value) {
    return insertData(value) +
      '┃\n' + getBorder('┣', '╋', '┫', row.length, size) + '\n';
  });
};

// const insertAllData = function (values, size) {
// const = function newValues = values.map(); //add size to each element
//   let table = values.map(addData);
// };

const insertAllData = function (values, size) {
  let table = [];

  for (const row of values) {
    for (const column of row) {
      table.push(insertData(column, size));
    }

    table.push('┃\n' + getBorder('┣', '╋', '┫', row.length, size) + '\n');
  }

  table.pop();
  return table.join("");
};

const getBorder = function (start, middle, end, columns, length) {
  const times = Math.ceil(length / 2);
  const column = DASH.repeat(times) + middle + DASH.repeat(times);

  const startingSegment = start + DASH.repeat(times);
  const endingSegment = DASH.repeat(times) + end;

  return startingSegment + column.repeat(columns - 1) + endingSegment;
};

const getMaxLength = function (value1, value2) {
  if (value2.toString().length > value1.length) {
    return value2.toString();
  }

  return value1;
};

const getLongestElement = function (longestCandidate, elements) {
  return elements.reduce(getMaxLength, longestCandidate);
};

const getLongestLength = function (elements) {
  return elements.reduce(getLongestElement, '').length;
};

const createTable = function (values) {
  const size = getLongestLength(values);

  const table = getBorder('┏', '┳', '┓', values[0].length, size) + '\n';
  const bottom = '┃\n' + getBorder('┗', '┻', '┛', values[0].length, size);

  return table + insertAllData(values, size) + bottom;
};

//******************************TESTING FUNCTIONS******************************

const display = function (table) {
  console.log(table);
};

const getMark = function (acutal, expected) {
  return acutal.toString() === expected.toString() ? '🟢' : '🔴';
};

const getHeading = function (...inputs) {
  const heading = ["Status"].concat(...inputs);
  heading.push("Expected Output", "Actual Output");

  return heading;
};

const mapper = function ([callbackFunction, inputs, expectedOutput]) {
  const actualOutput = callbackFunction(...inputs);
  const mark = getMark(actualOutput, expectedOutput);

  return [mark, ...inputs, expectedOutput, actualOutput];

};

const testRange = function (tableInputData) {
  return tableInputData.map(mapper);
};

//***********************************TESTING***********************************

const testAllRange = function () {
  const tableInputData = [
    [range, [0, 10, 1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [range, [0, 10, 2], [0, 2, 4, 6, 8]],
  ];

  const tableData = testRange(tableInputData);
  tableData.unshift(getHeading(["Start", "End", "Jump"]));

  display(createTable(tableData));
};

const testSupportingFunctions = function () {
  testAllRange();
};

const testAll = function () {
  testSupportingFunctions();
};

testAll();