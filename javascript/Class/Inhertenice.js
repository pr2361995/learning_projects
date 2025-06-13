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
    hide() {
        console.log(`${this.name} hides!`);
    }
  }
  
  let rabbit = new Rabbit("White Rabbit");
  rabbit.run(5);
  rabbit.stop();
  rabbit.hide();
  console.log(rabbit.__proto__); // Rabbit.prototype
  console.log(rabbit.__proto__.__proto__); // Animal.prototype
  console.log(rabbit.__proto__.__proto__ === Animal.prototype); // Animal.prototype
  console.log(rabbit.__proto__.__proto__.__proto__ === Object.prototype); // Object.prototype
  console.log([].__proto__ === Array.prototype); // Array.prototype
  console.log([].__proto__.__proto__ === Object.prototype); // Object.prototype
  console.log("prasanth".__proto__ === String.prototype); // String.prototype
  console.log("prasanth".__proto__.__proto__ === Object.prototype); // Object.prototype
  
  