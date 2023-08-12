const calculatorBody = document.querySelector('.calculator');

const generateRandomRGB = () => Math.floor(Math.random() * 256);

const getStartingBehaviour = (color) => (color > 126) ? 'decreasing' : 'increasing'; //Random RGB value decides if behaviour starts increasing/decreasing

const colors = [{
    color: generateRandomRGB(),
    fadeBehaviour: ''
}, {
    color: generateRandomRGB(),
    fadeBehaviour: ''
}, {
    color: generateRandomRGB(),
    fadeBehaviour: ''
}];

colors.map( color => {
    color.fadeBehaviour = getStartingBehaviour(color.color); //Get the starting behaviour initialized
});

calculatorBody.style.cssText = `background-color: rgb(${colors[0].color},${colors[1].color},${colors[2].color}, 1);`; //Initialize the background color

function fadeBgColor(colors) {

    colors.map(color => { //Loop through RGB and check color values to know when to invert growth.

        if (color.fadeBehaviour === 'increasing') { 
            color.color++; 
        } else {
            color.color--; 
        }

        if (color.color < 1) color.fadeBehaviour = 'increasing'; 

        if (color.color > 254) color.fadeBehaviour = 'decreasing';

    });

    calculatorBody.style.cssText = `background-color: rgb(${colors[0].color},${colors[1].color},${colors[2].color}, 1);`; //Updates the background color with new value

}

setInterval(() => {

    fadeBgColor(colors);

}, 60); //Executes fadeBgColor() every 60 miliseconds

//Above is all background color fade code

const calcBtns = document.querySelectorAll('.btn');
const screenOperation = document.querySelector('.screen .operation');
const screenResult = document.querySelector('.screen .result');
const currentOperation = { //Initialize the current operation object
    operandOne: '',
    operandTwo: '',
    operator: '',
    result: 0
};

calcBtns.forEach(btn => btn.addEventListener('click', whatIsBeingClicked)); 

function whatIsBeingClicked(event) { 

    const clickedElementClasses = event.target.className; //Get the classes of clicked element to verify/control

    if (clickedElementClasses.includes('nums')){

        if (currentOperation.operator === '') {
            numberAccomulator(event.target.innerText, 'operandOne');
        } else {
            numberAccomulator(event.target.innerText, 'operandTwo');
        }
    } 

    if (clickedElementClasses.includes('op')) {

        if (checkCalcObjStatus('op')) {

            if (currentOperation.operandTwo === '' && currentOperation.operandOne !== '') {
                currentOperation.operator = event.target.innerText;
            } else {
                decideOperation(currentOperation.operator);
                currentOperation.operator = event.target.innerText;
                currentOperation.operandOne = currentOperation.result.toString();                
            }
            
        } else {
            resetCalculator();
        }

    }

    if (clickedElementClasses.includes('equals')) {
        if (checkCalcObjStatus('equals')) {

            decideOperation(currentOperation.operator);

            
        } else {
            resetCalculator();
        }
    
    }

    if (clickedElementClasses.includes('AC')) {
        resetCalculator();
        currentOperation.result = 0;
    }

    if (clickedElementClasses.includes('negPlus')) {console.log(currentOperation);
        if (currentOperation.operandOne !== '' && currentOperation.operandTwo === '') {
            if (!(currentOperation.operandOne.includes('-'))) {
                currentOperation.operandOne = '-' + currentOperation.operandOne;
            } else {
                currentOperation.operandOne = currentOperation.operandOne.slice(1);
            }            
        }

        if (currentOperation.operandOne !== '' && currentOperation.operandTwo !== '') {
            if (!(currentOperation.operandTwo.includes('-'))) {
                currentOperation.operandTwo = '-' + currentOperation.operandTwo;
            } else {
                currentOperation.operandTwo = currentOperation.operandTwo.slice(1);
            }
            
        }
    }

    if (clickedElementClasses.includes('dot')) {
        if (currentOperation.operandTwo === '' && currentOperation.operator === '') {
            if (!(currentOperation.operandOne.includes('.'))) numberAccomulator('.', 'operandOne');                    
        }

        if (currentOperation.operandOne !== '' && currentOperation.operator !== '') {
            if (!(currentOperation.operandTwo.includes('.'))) numberAccomulator('.', 'operandTwo');                    
        }
    }
   

    
    showOnScreen(currentOperation);
    
}

function decideOperation(operator) {

    switch (operator) {
        case ('+'):
            if (currentOperation.operandTwo !== '') {
                currentOperation.result = add(+currentOperation.operandOne, +currentOperation.operandTwo);
            } else {
                currentOperation.result = add(+currentOperation.operandOne, +currentOperation.operandOne);
            }
            resetCalculator();
            break;
        case ('-'):
            if (currentOperation.operandTwo !== '') {
                currentOperation.result = subtract(+currentOperation.operandOne, +currentOperation.operandTwo);
            } else {
                currentOperation.result = subtract(+currentOperation.operandOne, +currentOperation.operandOne);
            }
            resetCalculator();
            break;
        case ('/'):
            if (currentOperation.operandTwo !== '') {
                currentOperation.result = divide(+currentOperation.operandOne, +currentOperation.operandTwo);
            } else {
                currentOperation.result = divide(+currentOperation.operandOne, +currentOperation.operandOne);
            }
            resetCalculator();
            break;
        case ('x'):
            if (currentOperation.operandTwo !== '') {
                currentOperation.result = multiply(+currentOperation.operandOne, +currentOperation.operandTwo);
            } else {
                currentOperation.result = multiply(+currentOperation.operandOne, +currentOperation.operandOne);
            }
            resetCalculator();
            break;
        case ('%'):
            if (currentOperation.operandTwo !== '') {
                currentOperation.result = modulo(+currentOperation.operandOne, currentOperation.operandTwo);
            } else {
                currentOperation.result = modulo(+currentOperation.operandOne, currentOperation.operandOne);
            }
            resetCalculator();
            break;
    }

}

function showOnScreen(currentOperation) { 

    if (currentOperation.operandOne !== '' && (currentOperation.operator === '' && currentOperation.operandTwo === '')) {
        screenOperation.innerText = `${currentOperation.operandOne}`;
    }else if ((currentOperation.operandOne !== '' && currentOperation.operator !== '') && currentOperation.operandTwo === '') {
        screenOperation.innerText = `${currentOperation.operandOne} ${currentOperation.operator}`;
    } else {
        screenOperation.innerText = `${currentOperation.operandOne} ${currentOperation.operator} ${currentOperation.operandTwo}`;
    }
    
    screenResult.innerText = Math.round((currentOperation.result + Number.EPSILON) * 100) / 100;

}

const numberAccomulator = (numberPressed, operand) => currentOperation[operand] += numberPressed;

function checkCalcObjStatus(btnPressed) { 

    if (btnPressed === 'equals') { //Only allows = to work if either operand one and operator exist (self calc) or if all exist for normal calc
        return ((currentOperation.operandOne !== '' && currentOperation.operator !== '' && currentOperation.operandTwo !== '') || (currentOperation.operandOne !== '' && currentOperation.operator !== '' && currentOperation.operandTwo === '')) ? 1 : 0;
    }

    if (btnPressed === 'op') {
        return (currentOperation.operator !== '' && currentOperation.operandOne === '' && currentOperation.operandTwo === '') ? 0 : 1; //If user presses operator only do nothing
    }  

}

const resetCalculator = () => {
    currentOperation.operandOne = '';
    currentOperation.operandTwo = '';
    currentOperation.operator = '';
}

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const divide = (x, y) => x / y;
const multiply = (x, y) => x * y;
const modulo = (x, y) => x % y;



