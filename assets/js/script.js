const result = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');


let currentOperand = '';
let previousOperand = '';
let operator = null;


function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


function updateDisplay() {
    result.value = formatNumberWithCommas(currentOperand);
    
}


function handleNumberInput(number) {
    if (number === '.' && currentOperand.includes('.')) {
        return; 
    }
    currentOperand += number;
    updateDisplay();
}


function handleOperatorInput(newOperator) {
    if (currentOperand === '') {
        return; 
    }
    if (previousOperand !== '') {
        evaluate();
    }
    operator = newOperator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}


function handleEqualsInput() {
    if (currentOperand === '' || previousOperand === '') {
        return; 
    }
    evaluate();
    operator = null;
    updateDisplay();
}


function handleClearInput() {
    currentOperand = '';
    previousOperand = '';
    operator = null;
    updateDisplay();
}


function handleBackspaceInput() {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
}


function evaluate() {
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(previous) || isNaN(current)) {
        return; 
    }
    switch (operator) {
        case '+':
            currentOperand = previous + current;
            break;
        case '-':
            currentOperand = previous - current;
            break;
        case '*':
            currentOperand = previous * current;
            break;
        case '/':
            currentOperand = previous / current;
            break;
        default:
            return;
    }
    previousOperand = '';
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        if (/\d/.test(buttonText)) {
            handleNumberInput(buttonText);
        } else if (/[+\-*/]/.test(buttonText)) {
            handleOperatorInput(buttonText);
        } else if (buttonText === '.') {
            handleNumberInput(buttonText);
        } else if (buttonText === 'C') {
            handleClearInput();
        } else if (buttonText === '←') {
            handleBackspaceInput();
        } else if (buttonText === '=') {
            handleEqualsInput();
        }
    });
});


