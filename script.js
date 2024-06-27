document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    let currentInput = "";
    let operator = "";
    let previousInput = "";
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const value = this.getAttribute("data-value");

            if (value === "C") {
                currentInput = "";
                operator = "";
                previousInput = "";
                display.innerText = "0";
            } else if (value === "=") {
                if (currentInput && previousInput && operator) {
                    currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
                    display.innerText = currentInput;
                    previousInput = currentInput;
                    operator = "";
                    shouldResetDisplay = true;
                }
            } else if (["+", "-", "*", "/"].includes(value)) {
                if (currentInput) {
                    if (previousInput && operator) {
                        currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
                        display.innerText = currentInput;
                    }
                    operator = value;
                    previousInput = currentInput;
                    currentInput = "";
                    shouldResetDisplay = true;
                }
            } else {
                if (shouldResetDisplay) {
                    currentInput = value;
                    shouldResetDisplay = false;
                } else {
                    currentInput += value;
                }
                display.innerText = currentInput;
            }
        });
    });
});