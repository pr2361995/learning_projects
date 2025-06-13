// …But usually we don’t want to totally replace a parent method, but rather to build on top of it,
// tweak or extend its functionality. We do something in our method, but call the parent method
// before/after it or in the process.

// Classes provide "super" keyword for that.
// super.method(...) to call a parent method.
// super(...) to call a parent constructor (inside our constructor only).


class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }
    run(speed) {
        this.speed += speed;
        alert(`${this.name} runs with speed ${this.speed}.`);
    }
    stop() {
        this.speed = 0;
        alert(`${this.name} stopped.`);
    }
}

class Rabbit extends Animal {
    constructor(name, earLength) {
        super(name);
        this.earLength = earLength;
    }
    hide() {
        alert(`${this.name} hides!`);
    }
    stop() {
        super.stop(); // call parent stop
        this.hide(); // and then hide
    }
}
let rabbit = new Rabbit("White Rabbit");
rabbit.run(5);// White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stopped. White rabbit hides!