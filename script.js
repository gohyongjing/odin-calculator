const DISPLAY_LIMIT = 15;

const screen = document.querySelector('#screen');
const buttons = document.querySelectorAll('button');

operators = {
    '+': (a, b) => String(Number(a) + Number(b)),
    '-': (a, b) => String(Number(a) - Number(b)),
    '*': (a, b) => String(Number(a) * Number(b)),
    '/': (a, b) => Number(b) != 0 ? String(Number(a) / Number(b)) : 'NaN',
};

operate = (operator, a, b) => operator(a, b);

function appendOperand(operand, char) {
    if (operand.includes('.')) {
        return char == '.' ? operand : operand + char;
    } else if (Number(operand) == 0 && char != '.') {
        return char;
    } else {
        return operand + char;
    }
}

function updateDisplay() {
    let operand = 'operand2' in state ? 'operand2' : 'operand1';
    let result = state[operand].slice(0, DISPLAY_LIMIT);
    screen.innerHTML = result;
}

function updateState(input) {
    if (input == 'clear') {
        state = { 'operand1': '0' };
    } else if (isNaN(input) && input != '.') {
        if ('operand2' in state && state['operand2'] != '=') {
            state['operand1'] = operate(
                    operators[state['operator']], state['operand1'], state['operand2']);
            delete state['operand2'];
        }
        state['operator'] = input;
    } else {
        if ('operator' in state) {
            if (state['operator'] == '=') {
                state['operand1'] = input;
                delete state['operator'];
            } else {
                 if (!('operand2' in state)) {
                    state['operand2'] = '0';
                }
                state['operand2'] = appendOperand(state['operand2'], input);
            }
        } else {
            state['operand1'] = appendOperand(state['operand1'], input);
        }
    }
    console.log(state);
    updateDisplay();
}


let state = { 'operand1': '0' };

buttons.forEach((button) => button.addEventListener('click', (e) => {
    updateState(button.id);
}));