  let animal = {
    name: "Animal",
    eat() {
      alert(`${this.name} eats.`);
    }
  };
  let rabbit = {
    __proto__: animal,
    eat() {
      // ...bounce around rabbit-style and call parent (animal) method
      this.__proto__.eat.call(this); // (*)
    }
  };
  let longEar = {
    __proto__: rabbit,
    eat() {
      // ...do something with long ears and call parent (rabbit) method
      this.__proto__.eat.call(this); // (**)
    }
  };
  longEar.eat(); 

// 1. Inside longEar.eat() , the line (**) calls rabbit.eat providing it with this=longEar .
// 2. Then in the line (*) of rabbit.eat , we’d like to pass the call even higher in the chain, but this=longEar , so this.__proto__.eat is again rabbit.eat !
// 3. …So rabbit.eat calls itself in the endless loop, because it can’t ascend any further.