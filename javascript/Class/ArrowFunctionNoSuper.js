class Animal {
    constructor(name) {
        this.name = name;
    }
    run(speed) {
        this.speed = speed;
        console.log(`${this.name} runs with speed ${this.speed}.`);
    }
    stop() {
        this.speed = 0;
        console.log(`${this.name} stands still.`);
    }
  }
  class Rabbit extends Animal {
    stop() {
        // setTimeout(() => super.stop(), 1000); // run after 1sec
        setTimeout(function(){ super.stop()}, 1000); // error
    }
  }
    
  let rabbit = new Rabbit("White Rabbit");
  rabbit.stop();
  
  // Arrow functions don't create their own this context
  // They inherit this and super from their enclosing scope
  // In this case, it inherits from the stop() method where super is valid
  
  // Regular functions: Create new this binding and don't have super
  // Arrow functions: Inherit this and super from enclosing scope