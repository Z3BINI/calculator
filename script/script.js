const body = document.querySelector('.calculator');

const generateRandomRGB = () => Math.floor(Math.random() * 256);

const getStartingBehaviour = (color) => {
    return (color > 126) ? 'decreasing' : 'increasing'; //Random RGB value decides if behaviour starts increasing/decreasing
}  

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

body.style.cssText = `background-color: rgb(${colors[0].color},${colors[1].color},${colors[2].color}, 1);`; //Initialize the background color

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

    body.style.cssText = `background-color: rgb(${colors[0].color},${colors[1].color},${colors[2].color}, 1);`; //Updates the background color with new value

}

setInterval(() => {

    fadeBgColor(colors);

  }, 60); //Executes fadeBgColor() every 60 miliseconds


const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;