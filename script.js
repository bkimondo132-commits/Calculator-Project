// Keep each part of the calculation in a separate variable.
let currentNumber = "";
let previousNumber = "";
let selectedOperator = "";
let isShowingResult = false;

const display = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector("[data-action='clear']");
const equalsButton = document.querySelector("[data-action='equals']");
const decimalButton = document.querySelector("[data-action='decimal']");
const percentButton = document.querySelector("[data-action='percent']");

function updateDisplay(value) {
  display.textContent = value || "0";
}

// Add a clicked digit to the number currently being typed.
function addNumber(number) {
  if (isShowingResult) {
    currentNumber = "";
    isShowingResult = false;
  }

  currentNumber += number;
  updateDisplay(currentNumber);
}

// Add one decimal point and start with zero when the user begins with ".".
function addDecimal() {
  if (isShowingResult) {
    currentNumber = "";
    isShowingResult = false;
  }

  if (!currentNumber.includes(".")) {
    currentNumber = currentNumber || "0";
    currentNumber += ".";
    updateDisplay(currentNumber);
  }
}

// Convert the number currently being entered into its percentage value.
function convertToPercent() {
  if (currentNumber === "") {
    return;
  }

  currentNumber = String(Number(currentNumber) / 100);
  updateDisplay(currentNumber);
}

// Save the first number and the operator until the second number is entered.
function chooseOperator(operator) {
  if (currentNumber === "" && previousNumber === "") {
    return;
  }

  if (currentNumber !== "" && previousNumber !== "" && selectedOperator !== "") {
    calculate();
  }

  previousNumber = currentNumber || previousNumber;
  currentNumber = "";
  selectedOperator = operator;
  isShowingResult = false;
  updateDisplay(previousNumber + " " + operator);
}

function calculate() {
  const firstNumber = Number(previousNumber);
  const secondNumber = Number(currentNumber);
  let result;

  if (selectedOperator === "+") {
    result = firstNumber + secondNumber;
  } else if (selectedOperator === "-") {
    result = firstNumber - secondNumber;
  } else if (selectedOperator === "×") {
    result = firstNumber * secondNumber;
  } else if (selectedOperator === "÷") {
    if (secondNumber === 0) {
      updateDisplay("Cannot divide by 0");
      currentNumber = "";
      previousNumber = "";
      selectedOperator = "";
      isShowingResult = true;
      return;
    }
    result = firstNumber / secondNumber;
  } else {
    return;
  }

  currentNumber = String(result);
  previousNumber = "";
  selectedOperator = "";
  isShowingResult = true;
  updateDisplay(currentNumber);
}

function clearCalculator() {
  currentNumber = "";
  previousNumber = "";
  selectedOperator = "";
  isShowingResult = false;
  updateDisplay("0");
}

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    addNumber(button.dataset.number);
  });
});

operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    chooseOperator(button.dataset.operator);
  });
});

equalsButton.addEventListener("click", function () {
  if (previousNumber !== "" && currentNumber !== "") {
    calculate();
  }
});

clearButton.addEventListener("click", clearCalculator);
decimalButton.addEventListener("click", addDecimal);
percentButton.addEventListener("click", convertToPercent);