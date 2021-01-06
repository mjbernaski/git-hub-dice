// < reference path="./p5.global-mode.d.ts" / >

let dice = [];
let printString; 

function setup() {
  createCanvas(800,800); 
  background(0); 
  noLoop();
  button = createButton('click me');
  button.position(19, 19);
  button.mousePressed(rollDice);
}

function createDice(number) {
  for (i=0; i < number; i++) {
    dice.push(new Di(6)); 
  }
}

function rollDice() {
  printString = [];
  for (di of dice) {
    if (!di.held) {
      let temp = di.roll(); 
    }
    printString.push(di.currentValue);
  }
  console.log(printString); 

push(); 
background(0);
textSize(32);
fill(255);
translate(100,0); 
text(printString, 10, 30);
pop(); 

let w = width / dice.length; 



  
}

function draw() {
  createDice(5); 
  rollDice(); 
}
