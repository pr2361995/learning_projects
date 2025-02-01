let a = 10; // Global variable a

function test(){
    console.log(a); // Prints undefined due to hoisting
    debugger;

    if(true){
      debugger;
      console.log(a); // Prints undefined, variable a is hoisted
        var a = 10; // Declares a, hoisted inside function
        let b = 15; // b is block-scoped
    }
    debugger;
    console.log(b); // Error: b is not accessible outside the block
}

test();

/*
### **Key Takeaways:**
✅ **Hoisting with `var`**: Variables declared with `var` are hoisted to the top of the function scope and are initialized with `undefined`. In this case, `a` is hoisted to the top and is `undefined` until assigned.
✅ **Temporal Dead Zone with `let`**: Variables declared with `let` are hoisted, but they stay in a **temporal dead zone** until they are initialized. In this case, `b` is only accessible inside the `if` block, and trying to access it outside the block causes a **ReferenceError**.
✅ **Variable Shadowing**: The local `a` inside the function (created by `var`) **shadows** the global `a`, meaning the global `a` is not used inside the function.
✅ **Block Scope with `let`**: The `let`-declared variable `b` is **scoped to the block** (the `if` block) and is not accessible outside. Therefore, trying to access `b` after the block causes a **ReferenceError**.
*/
