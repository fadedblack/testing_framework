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

const insertData = function (message, maxColumnWidth) {
  const totalSpaces = maxColumnWidth - message.toString().length;
  const padding = isEven(maxColumnWidth) ? 0 : 1;

  const timesLeft = Math.floor(totalSpaces / 2);
  const timesRight = Math.ceil(totalSpaces / 2) + padding;
  // const timesRight = totalSpaces - timesLeft;

  return BAR + SPACE.repeat(timesLeft) + message + SPACE.repeat(timesRight);
};

const insertAllData = function (values, maxColumnWidth) {
  let table = [];
  const border = getBorder('┣', '╋', '┫', values[0].length, maxColumnWidth);

  for (const row of values) {
    for (const column of row) {
      table.push(insertData(column, maxColumnWidth));
    }

    table.push('┃\n' + border + '\n');
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

const findLongestString = function (longest, value) {
  return longest.length < value.toString().length ? value.toString() : longest;
};

const getLongestLength = function (elements) {
  const longestString = elements.flat().reduce(findLongestString, '');

  return longestString.length;
};

const createTable = function (values) {
  const maxColumnWidth = getLongestLength(values);

  const table = getBorder('┏', '┳', '┓', values[0].length, maxColumnWidth) + '\n';
  const bottom = '┃\n' + getBorder('┗', '┻', '┛', values[0].length, maxColumnWidth);

  return table + insertAllData(values, maxColumnWidth) + bottom;
};

//******************************TESTING FUNCTIONS******************************

const display = function (table) {
  console.log(table);
};

const getMark = function (acutual, expected) {
  return acutual.toString() === expected.toString() ? '🟢' : '🔴';
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

const processTests = function (tableInputData) {
  return tableInputData.map(mapper);
};

//***********************************TESTING***********************************

const testAllRange = function () {
  const tableInputData = [
    [range, [0, 10, 1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [range, [0, 10, 2], [0, 2, 4, 6, 8]],
  ];

  const tableData = processTests(tableInputData);
  tableData.unshift(getHeading(["Start", "End", "Jump"]));

  display(createTable(tableData));
};

const testGroup = function (testName, testFunction) {
  console.log("Running Test Group:", testName);
  testFunction();
  console.log("Completed Running Test Group:", testName);
};

const testAll = function () {
  testGroup("Range Function", testAllRange);
};

testAll();