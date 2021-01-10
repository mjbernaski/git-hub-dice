/// < reference path="./p5.global-mode.d.ts" / >

let dice = [];
let printString; 
let w = 100; 
let rolls= 0; 
let diceString = "Good Luck!"; 

function setup() {
  createCanvas(600,400); 
  background(0); 
  noLoop();
  button = createButton('Roll Dice');
  button.style('font-size', '30px');
  button.position(19, 19);
  button.mousePressed(rollDice);
  button2 = createButton('Restart');
  button2.style('font-size', '30px');
  button2.position(425, 19);
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

function createDice(number) {
  for (i=0; i < number; i++) {
    dice.push(new Di(6)); 
  }
}

function rollDice() {

  diceString = "  ";
  if (rolls === 2 {
    button.attribute('disabled', '')
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
textSize(16);
fill(255);
text('Completed Rolls: ' + rolls, 19, 300);
fill(255,0,0); 
stroke(255,0,0); 
text(diceString, 400, 300); 
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

function checkDice() {
  let counter = {
    "1": 0,
    "2": 0, 
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0
  }



  let binaryString = '';

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
