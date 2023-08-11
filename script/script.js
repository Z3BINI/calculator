const calculatorBody = document.querySelector('.calculator');

const calcBtns = document.querySelectorAll('.btn');

const screenOperation = document.querySelector('.screen .operation');

const screenResult = document.querySelector('.screen .result');

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


calcBtns.forEach(btn => btn.addEventListener('click', whatIsBeingClicked));

const currentOperation = {
    currentNumber: '',
    operationType: '',
    accomulator: 0
};

function whatIsBeingClicked(event) {

    const whatIsClicked = event.target.className;

    if (whatIsClicked.includes('nums')){
        numberAccomulator(event.target.innerText);
    } 

    if (whatIsClicked.includes('op')) {

        if (currentOperation.currentNumber !== '' && currentOperation.accomulator) {
            switch (currentOperation.operationType) {
                case ('+'):
                    currentOperation.accomulator += +(currentOperation.currentNumber);
                    currentOperation.currentNumber = '';
                    currentOperation.operationType = '';
                    break;
                case ('-'):
                    currentOperation.accomulator -= +(currentOperation.currentNumber);
                    currentOperation.currentNumber = '';
                    currentOperation.operationType = '';
                    break;
                case ('/'):
                    currentOperation.accomulator /= +(currentOperation.currentNumber);
                    currentOperation.currentNumber = '';
                    currentOperation.operationType = '';
                    break;
                case ('x'):
                    currentOperation.accomulator *= +(currentOperation.currentNumber);
                    currentOperation.currentNumber = '';
                    currentOperation.operationType = '';
                    break;
                case ('%'):
                    currentOperation.accomulator = currentOperation.accomulator % +(currentOperation.currentNumber);
                    currentOperation.currentNumber = '';
                    currentOperation.operationType = '';
                    break;
            }
        }

        currentOperation.operationType = event.target.innerText;

    }
    if (whatIsClicked.includes('equals')) console.log('equals')

    if (whatIsClicked.includes('AC')) resetCalc();


    operation(currentOperation);

    showOnScreen(currentOperation);

}

const resetCalc = () => {
    currentOperation.currentNumber = '';
    currentOperation.operationType = '';
    currentOperation.accomulator = 0;
}

const numberAccomulator = clickedNumber => currentOperation.currentNumber += clickedNumber;

const showOnScreen = (currentOperation) => { 

    if (currentOperation.operationType === '' && currentOperation.accomulator === 0) {
        screenOperation.innerText = `${currentOperation.currentNumber}`;
    } else if (currentOperation.operationType !== '' && currentOperation.currentNumber === '') {
        screenOperation.innerText = `${currentOperation.accomulator} ${currentOperation.operationType}`;
    } else {
        screenOperation.innerText = `${currentOperation.accomulator} ${currentOperation.operationType} ${currentOperation.currentNumber}`;
    }
     
    screenResult.innerText = currentOperation.accomulator;
}

function operation(currentOperation) {
    if (currentOperation.operationType !== '') {
        if (!(currentOperation.accomulator)) {
            currentOperation.accomulator = +(currentOperation.currentNumber);
            currentOperation.currentNumber = '';
        }
    }
}