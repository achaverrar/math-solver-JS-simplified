"use strict";
const form = document.getElementById("equation-form");
const input = document.getElementById("equation");
const output = document.getElementById("results");
const REGEXP = {
  ADD_SUBTRACT: /(?<num1>\S+)\s*(?<operator>(?<!e)[\+\-])\s*(?<num2>\S+)/,
  MULTIPLY_DIVIDE: /(?<num1>\S+)\s*(?<operator>(?<!e)[\*\/])\s*(?<num2>\S+)/,
  EXPONENTIATION: /(?<num1>\S+)\s*(?<operator>(?<!e)[\^])\s*(?<num2>\S+)/,
  GROUPING: /\((?<subEq>[^\(\)]+)\)/,
};

function parse(str) {
  let result = str;
  let newEq = "";
  let replacement = "";
  if (str.match(REGEXP.GROUPING)) {
    newEq = str.match(REGEXP.GROUPING);
    replacement = parse(newEq.groups.subEq);
    result = str.replace(newEq[0], replacement);
    return parse(result);
  }
  if (str.match(REGEXP.EXPONENTIATION)) {
    newEq = str.match(REGEXP.EXPONENTIATION);
    replacement = handleMath(newEq.groups);
    result = str.replace(newEq[0], replacement);
    return parse(result);
  } else if (str.match(REGEXP.MULTIPLY_DIVIDE)) {
    newEq = str.match(REGEXP.MULTIPLY_DIVIDE);
    replacement = handleMath(newEq.groups);
    result = str.replace(newEq[0], replacement);
    return parse(result);
  } else if (str.match(REGEXP.ADD_SUBTRACT)) {
    newEq = str.match(REGEXP.ADD_SUBTRACT);
    replacement = handleMath(newEq.groups);
    result = str.replace(newEq[0], replacement);
    return parse(result);
  } else {
    return parseFloat(result);
  }
}

function handleMath({ num1, num2, operator }) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch (operator) {
    case "^":
      return num1 ** num2;
    case "*":
      return num1 * num2;
    case "/":
      if (!num2) return NaN;
      return num1 / num2;
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    default:
      return NaN;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Retrieve input
  const inputText = input.value.trim();
  if (!inputText) return;
  const solution = parse(inputText);
  console.log(solution);
  console.log(parse(inputText));
  // Output solution
  output.textContent = solution;
});
