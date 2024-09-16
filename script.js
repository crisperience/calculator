let currentInput = "";
let previousInput = "";
let operator = null;

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.dataset.number) {
            handleNumber(button.dataset.number);
        } else if (button.dataset.operator) {
            handleOperator(button.dataset.operator);
        } else if (button.id === "clear") {
            clearCalculator();
        } else if (button.id === "equals") {
            calculate();
        }
    });
});

function handleNumber(number) {
    if (currentInput === "" && number === "0") return; // Avoid multiple leading zeros
    currentInput += number;
    updateDisplay(currentInput);
}

function handleOperator(op) {
    if (currentInput === "") return;
    if (previousInput !== "") {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "";
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "*":
            result = prev * curr;
            break;
        case "/":
            if (curr === 0) {
                alert("Cannot divide by zero!");
                return;
            }
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = "";
    operator = null;
    updateDisplay(currentInput);
}

function clearCalculator() {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay("0");
}

function updateDisplay(value) {
    display.textContent = value;
}
