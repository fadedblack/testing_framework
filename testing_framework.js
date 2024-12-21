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

const addData1 = function (value) {
  return insertData(value) +
    '┃\n' + getBorder('┣', '╋', '┫', row.length, size) + '\n';
};

const addData = function (values) {
  return values.map(addData1);
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

function display(table) {
  console.log(table);
}

function getMark(acutal, expected) {
  return acutal.toString() === expected.toString() ? '🟢' : '🔴';
}

function test(input, expected, tableData) {
  const acutal = rectangle(input);
  const mark = getMark(acutal, expected);

  const testData = [mark, input, expected, acutal];

  tableData.push(testData);
}

function getHeading(...inputs) {
  const heading = ["Status"].concat(...inputs);
  heading.push("Expected Output", "Actual Output");

  return heading;
}

//***********************************TESTING***********************************

function printTable(tableData) {
  display(createTable(tableData));
}

function testRange(from, to, jump, expected, tableData) {
  const acutal = range(from, to, jump);
  const mark = getMark(acutal, expected);

  const testData = [mark, from, to, jump, expected, acutal];

  tableData.push(testData);
}

function testLeadingFunction() { //change name
  // testRectangle();
}

function testAllRange() {
  display("Testing Range Function");

  const tableData = [getHeading(["Start", "End", "Jump"])];

  testRange(0, 10, 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], tableData);
  testRange(0, 10, 2, [0, 2, 4, 6, 8], tableData);

  printTable(tableData);
}

function testSupportingFunctions() {
  testAllRange();
}

function testAll() {
  testSupportingFunctions();
}

testAll();