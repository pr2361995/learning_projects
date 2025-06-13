// The very existance of [[HomeObject]] violates that principle, because methods remember
// their objects. [[HomeObject]] can’t be changed, so this bond is forever.

// The only place in the language where [[HomeObject]] is used – is super . So, if a method
// does not use super , then we can still consider it free and copy between objects.

let animal = {
    sayHi() {
        console.log(`I'm an animal`);
    }
};

let rabbit = {
    __proto__: animal,
    sayHi() {
        super.sayHi();
    }
};

let plant = {
    sayHi() {
        console.log("I'm a plant");
    }
};

let tree = {
    __proto__: plant,
    sayHi: rabbit.sayHi
};

tree.sayHi(); 


// So its [[HomeObject]] is rabbit , as it was created in rabbit . There’s no way to
// change [[HomeObject]] .

// The code of tree.sayHi() has super.sayHi() inside. It goes up from rabbit and
// takes the method from animal .
