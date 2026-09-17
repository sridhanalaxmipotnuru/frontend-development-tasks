// ---------------------------------
// Calculator
// ---------------------------------

const display =
    document.getElementById("display");


// ---------------------------------
// Add Number
// ---------------------------------

function appendNumber(number) {

    if (display.value === "0") {

        display.value = number;

    } else {

        display.value += number;

    }

}


// ---------------------------------
// Add Operator
// ---------------------------------

function appendOperator(operator) {

    const lastCharacter =
        display.value.slice(-1);


    // Prevent multiple operators

    if (
        ["+", "-", "*", "/", "%"]
        .includes(lastCharacter)
    ) {
        return;
    }


    display.value += operator;

}


// ---------------------------------
// Clear Display
// ---------------------------------

function clearDisplay() {

    display.value = "0";

}


// ---------------------------------
// Delete Last Character
// ---------------------------------

function deleteLast() {

    if (display.value.length === 1) {

        display.value = "0";

    } else {

        display.value =
            display.value.slice(0, -1);

    }

}


// ---------------------------------
// Calculate Result
// ---------------------------------

function calculateResult() {

    try {

        let expression =
            display.value;


        // Calculate the expression

        let result =
            Function(
                `"use strict"; return (${expression})`
            )();


        if (
            result === undefined ||
            !isFinite(result)
        ) {

            display.value = "Error";

            return;

        }


        display.value = result;

    }

    catch (error) {

        display.value = "Error";

    }

}


// ---------------------------------
// Keyboard Support
// ---------------------------------

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        // Numbers

        if (
            key >= "0" &&
            key <= "9"
        ) {

            appendNumber(key);

        }


        // Decimal

        else if (key === ".") {

            appendNumber(".");

        }


        // Operators

        else if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/" ||
            key === "%"
        ) {

            appendOperator(key);

        }


        // Enter = Calculate

        else if (
            key === "Enter" ||
            key === "="
        ) {

            calculateResult();

        }


        // Backspace = Delete

        else if (key === "Backspace") {

            deleteLast();

        }


        // Escape = Clear

        else if (key === "Escape") {

            clearDisplay();

        }

    }
);