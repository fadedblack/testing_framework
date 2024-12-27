const add = (x, y) => x + y;

//************************************TABLE*************************************

const DASH = "━";
const BAR = "┃";
const SPACE = " ";

const isEven = (number) => (number & 1) === 0;

const insertData = function (message, maxColumnWidth) {
  const totalSpaces = maxColumnWidth - message.toString().length;
  const padding = isEven(maxColumnWidth) ? 0 : 1;

  const timesLeft = Math.floor(totalSpaces / 2);
  const timesRight = Math.ceil(totalSpaces / 2) + padding;

  return BAR + SPACE.repeat(timesLeft) + message + SPACE.repeat(timesRight);
};

const insertAllData = function (values, maxColumnWidth) {
  const table = [];
  const border = getBorder(["┣", "╋", "┫"], values[0].length, maxColumnWidth);

  for (const row of values) {
    for (const column of row) {
      table.push(insertData(column, maxColumnWidth));
    }

    table.push("┃\n" + border + "\n");
  }

  table.pop();
  return table.join("");
};

const getBorder = function ([start, middle, end], columns, length) {
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
  const longestString = elements.flat().reduce(findLongestString, "");

  return longestString.length;
};

const createTable = function (values) {
  let maxColumnWidth = getLongestLength(values);

  const table =
    getBorder(["┏", "┳", "┓"], values[0].length, maxColumnWidth) + "\n";
  const bottom =
    "┃\n" + getBorder(["┗", "┻", "┛"], values[0].length, maxColumnWidth);

  return table + insertAllData(values, maxColumnWidth) + bottom;
};

//******************************TESTING FUNCTIONS******************************

const display = function (table) {
  console.log(table);
};

const getMark = function (acutual, expected) {
  return acutual.toString() === expected.toString() ? "🟢" : "🔴";
};

const getHeading = function (...inputs) {
  const heading = ["Status"].concat(...inputs);
  heading.push("Expected Output", "Actual Output");

  return heading;
};

const mapper = function ([callbackFunction, inputs, expectedOutput]) {
  const actualOutput = callbackFunction(...inputs);
  const mark = getMark(actualOutput, expectedOutput); // change to lambda function

  return [mark, ...inputs, expectedOutput, actualOutput];
};

const processTests = function (tableInputData) {
  return tableInputData.map(mapper);
};

//***********************************TESTING***********************************

const testAdd = function () {
  const tableInputData = [
    [add, [2, 3], 5],
    [add, [2, -3], -1],
  ];

  const tableData = processTests(tableInputData);
  tableData.unshift(getHeading(["Number1", "Number2"]));

  display(createTable(tableData));
};

const testGroup = function (testName, testFunction) {
  console.log("Running Test Group:", testName);
  testFunction();
  console.log("Completed Running Test Group:", testName);
};

const testAll = function () {
  testGroup("Add Function", testAdd);
};

testAll();
