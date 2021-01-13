

class Di {
    constructor(sides) {
        this.sides = sides; 
        this.held = false; 
        this.rollhistory = [];
        this.currentValue = 0; 
    }

    roll() {
        let value = int(random(1,this.sides+1)); 
        this.rollhistory.push(value); 
        this.currentValue = value; 
        return value; 
    }

    toggleHold() {
        this.held = !this.held; 
        if (this.held) {
            console.log('Toggled and now being held ', this.currentValue);
        } else {
            console.log('Toggled and not being held ', this.currentValue);
        }
    
    }

    reset() {
        this.held = false;
        this.rollHistory = [];
        this.currentValue = 0; 
    }

    
}