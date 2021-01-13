/// < reference path="./p5.global-mode.d.ts" / >

let dice = [];
let printString; 
let w; 
let rolls= 0; 
let diceString = "Good Luck!"; 
let nextTurnLabel = "New Turn";
let xOffset = 20; 
let yOffset = 20; 
let diceEdge; 
let offset; 


function setup() {
  createCanvas(windowWidth,windowHeight); 
  background(0); 
  noLoop();
  diceEdge = diceSize(); 
  offset = diceEdge/10
  w = diceEdge;
  let buttSize = String(floor(diceEdge/5))+'px';
  console.log(buttSize); 
  button = createButton('Roll Dice');
  button.style('font-size', buttSize);
  button.position(10, yOffset);
  button.mousePressed(rollDice);
  button2 = createButton(nextTurnLabel);
  button2.style('font-size', buttSize);
  let b2Offset = ((offset * 10) < 150) ? 100: (offset * 10);
  button2.position(b2Offset, yOffset);
  button2.mousePressed(reset);
}

function keyPressed() {
  rollDice(); 
}

function reset() {
  console.log('Resetting'); 
  rolls = 0; 
  button.removeAttribute('disabled');
  diceString = "Good Luck!"
  dice = []; 
  printString = [];
  createDice(5); 
  rollDice(); 
}

function diceSize() {
  // let smallerEdge = (width >= height) ? height : width;
  let smallerEdge = width; 
  return smallerEdge / 8; 
}

function createDice(number) {
  for (i=0; i < number; i++) {
    dice.push(new Di(6)); 
  }
}

function rollDice() {

  diceString = "  ";

  if (rolls === 2) {
    button.attribute('disabled', '');
  } 

  printString = [];
  rolls += 1; 

  for (di of dice) {
    if (!di.held) {
      let temp = di.roll(); 
    }
    printString.push(di.currentValue);
  }

checkDice();

push(); 
background(0);
textSize(offset*2);
fill(255);
text('Completed Rolls: ' + rolls, xOffset/2, height-(2* yOffset));
fill(255,0,0); 
stroke(255,0,0); 
textSize(offset*4);
text(diceString, width/2 ,height-(2* yOffset)); 
pop(); 

let index = diceEdge; 

let diCounter = 0; 

let start = diceEdge/2; 

for (item of printString) {

  stroke(255); 
  noFill(); 
  textSize(diceEdge/3);
  rectMode(CENTER); 
  rect(index, height/2, diceEdge, diceEdge); 
  fill(255); 
  text(item, index-offset, height/2+offset); 

  console.log(offset); 

  if (dice[diCounter].held) {
    let tx1 = index + (4 * offset);
    ellipse(tx1, height/2+(4*offset), offset); 
  }
  diCounter+=1; 
  index += diceEdge * 1.5; 
} 
}

function checkDice() {
  let counter = {
    "1": 0,
    "2": 0, 
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0
  }

  for (item of printString)
  {
    let which = str(item);
    counter[which] += 1
  }

let keys = Object.keys(counter); 

let aTwo = false; 
let aThree = false; 
let aFour = false; 

for (item of keys) {

  if (counter[item] == 5) {
    diceString = "Yahtzee"; 
    return
    }
  if (counter[item] == 3) {
    aThree = true; 
    }
    if (counter[item] == 2) {
      aTwo = true; 
    }
    if (counter[item] == 4) {
      aFour = true;
      diceString = "Four of a Kind";  
    }
    if (aTwo && aThree) {
      diceString = "Full House";
      return
    }
    if (aThree) {
      diceString = "Three of a Kind";
    }
  }

if ( (counter["1"]==1) && (counter["2"]==1) && (counter["3"]==1) && (counter["4"]==1) && (counter["5"]==1)) {
  diceString = "Large Straight";
  console.log(counter)
  return
}

if ( (counter["2"]==1) && (counter["3"]==1) && (counter["4"]==1) && (counter["5"]==1) && (counter["6"]==1)) {
  diceString = "Large Straight";
  return
}

if ( (counter["1"]>=1) && (counter["2"]>=1) && (counter["3"]>=1) && (counter["4"]>=1) && (counter["5"]==0)) {
  diceString = "Small Straight";
  return
}

if ( (counter["1"]==0) && (counter["2"]>=1) && (counter["3"]>=1) && (counter["4"]>=1) && (counter["5"]>=1) && (counter["6"]==0) ) {
  diceString = "Small Straight";
  return
}

if ((counter["2"]==0) && (counter["3"]>=1) && (counter["4"]>=1) && (counter["5"]>=1) && (counter["6"]>=1) ) {
  diceString = "Small Straight";
  return
}

}

function touchStarted() {
  mousePressed(); 
}

function mousePressed() {
  let tx1, tx2; 
  if ((mouseY >= height/2-(diceEdge/2)) && (mouseY <=height/2+(diceEdge/2))) {
    i = 0; 
    tx1 = diceEdge/2; 
    tx2 = tx1 + diceEdge;
    while (i < printString.length) {
      if ((mouseX >= tx1) && (mouseX <= tx2)) {
        dice[i].toggleHold(); 
        if (dice[i].held) {
          ellipse(tx1+(9*offset), height/2+(4 * offset), offset); 
        } else {
          push();
          fill(0); 
          ellipse(tx1+(9*offset), height/2+(4 * offset), offset);
          console.log(offset); 
          pop();
        }
        break; 
      } 
        tx1 = tx1 + (1.5 * diceEdge);
        tx2 = tx1 + diceEdge; 
        i++; 
    }
      
    }
  } 

function draw() {
  createDice(5); 
  rollDice(); 
}
