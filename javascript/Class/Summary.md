1. To extend a class: class Child extends Parent :
    That means Child.prototype.__proto__ will be Parent.prototype , so methods are inherited.
2. When overriding a constructor:
    We must call parent constructor as super() in Child constructor before using this .
3. When overriding another method:
    We can use super.method() in a Child method to call Parent method.
4. Internals:
    let animal = {
        eat: function() { // should be the short syntax: eat() {...}
            // ...
        }
    };
    let rabbit = {
        __proto__: animal,
        eat: function() {
            super.eat();
        }
    };
    rabbit.eat(); // Error calling super (because there's no [[HomeObject]])

Summary
    Methods remember their class/object in the internal [[HomeObject]] property. That’s how super resolves parent methods.
    So it’s not safe to copy a method with super from one object to another