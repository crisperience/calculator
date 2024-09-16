let currentInput = "";
let previousInput = "";
let operator = null;
let hasDecimal = false;

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
        } else if (button.id === "decimal") {
            handleDecimal();
        } else if (button.id === "backspace") {
            handleBackspace();
        }
    });
});

function handleNumber(number) {
    if (currentInput === "" && number === "0") return;
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
    hasDecimal = false;
}

function handleDecimal() {
    if (!hasDecimal) {
        currentInput += ".";
        hasDecimal = true;
        updateDisplay(currentInput);
    }
}

function handleBackspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
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
    hasDecimal = currentInput.includes(".");
}

function clearCalculator() {
    currentInput = "";
    previousInput = "";
    operator = null;
    hasDecimal = false;
    updateDisplay("0");
}

function updateDisplay(value) {
    display.textContent = value;
}

// Keyboard support
document.addEventListener("keydown", (event) => {
    if (!isNaN(event.key)) {
        handleNumber(event.key);
    } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        handleOperator(event.key);
    } else if (event.key === ".") {
        handleDecimal();
    } else if (event.key === "Enter") {
        calculate();
    } else if (event.key === "Backspace") {
        handleBackspace();
    } else if (event.key.toLowerCase() === "c") {
        clearCalculator();
    }
});
