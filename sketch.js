// < reference path="./p5.global-mode.d.ts" / >

let dice = [];
let printString; 
let w = 100; 
let rolls= 0; 

function setup() {
  createCanvas(800,800); 
  background(0); 
  noLoop();
  button = createButton('Roll Dice');
  button.position(19, 19);
  button.mousePressed(rollDice);
  button = createButton('Reset');
  button.position(500, 400);
  button.mousePressed(reset);
}

function reset() {
  rolls = 0; 
  dice = []; 
  createDice(5); 
  rollDice(); 

}

function createDice(number) {
  for (i=0; i < number; i++) {
    dice.push(new Di(6)); 
  }
}

function rollDice() {
  printString = [];

  rolls += 1; 


  for (di of dice) {
    if (!di.held) {
      let temp = di.roll(); 
    }
    printString.push(di.currentValue);
  }

push(); 
background(0);
textSize(16);
fill(255);
text('Completed Rolls: ' + rolls, 19, 400);
pop(); 

let index = 0; 
let diCounter = 0; 

for (item of printString) {
  stroke(255); 
  noFill(); 
  textSize(32);
  rect((w + index)-30, 150, 75, 75 ); 
  fill(255); 
  text(item, w + index, 200);
  index += 100;
  if (dice[diCounter].held) {
    let tx1 = (w + ((diCounter)*100))-30;
    ellipse(tx1 + 9, 215, 10); 
  }
  diCounter+=1; 
} 
}

function touchStarted() {
  mouseClicked(); 
}

function mouseClicked() {
  if ((mouseY >= 150) && (mouseY <=225)) {
    for (i=0; i <= printString.length; i++) {
      let tx1 = (w + ((i)*100))-30;
      let tx2 = (w + ((i)*100))+45; 
      if ((mouseX >= tx1) && (mouseX <= tx2)) {
        dice[i].toggleHold(); 
        if (dice[i].held) {
          ellipse(tx1 + 9, 215, 10); 
        } else {
          push();
          fill(0); 
          ellipse(tx1 + 9, 215, 10); 
          pop();

        }
      }
    }
  } 

}

function draw() {
  createDice(5); 
  rollDice(); 
}
