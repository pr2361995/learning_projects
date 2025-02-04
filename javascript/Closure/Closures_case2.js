/*
### **When a function executes, JavaScript creates an Execution Context:**
1. **Global Execution Context (GEC)** – Created when the script starts.
2. **Function Execution Context (FEC)** – Created whenever a function is called.
3. **Each Execution Context has:**
   - **Variable Environment (VE)** – Stores local variables, function declarations, and arguments.
   - **Lexical Environment (LE)** – Reference to the parent’s scope.
   - **Scope Chain** – A linked list of lexical environments.
*/
let globalVar = "I am global";  

function outer() {
    let outerVar = "I am in outer";
    
    function inner() {
        let innerVar = "I am in inner";
        console.log(globalVar);  // Access global scope
        console.log(outerVar);   // Access outer scope
    }
    
    inner();
}

outer();

/*
### **Scope Chain Representation**
When `inner()` is executed, JavaScript looks for variables in this order:
1. **inner()'s Local Scope** → Checks for `globalVar` or `outerVar`, doesn't find them.
2. **outer()'s Scope** → Finds `outerVar`, still doesn't find `globalVar`.
3. **Global Scope** → Finds `globalVar`.
*/
/*
## **2. What is a Closure?**
A **closure** is formed when a function "remembers" variables from its parent scope **even after the parent function has returned**.
*/
function outer() {
    let count = 0;

    return function inner() {
        count++;
        console.log(count);
    };
}

const counter = outer();  
counter();  // Output: 1
counter();  // Output: 2

/*
### **How Closures Work Here**
1. `outer()` runs, creates `count = 0`, and returns `inner()`.
2. `inner()` is assigned to `counter`, but it still **remembers `count`** from `outer()`, even though `outer()` has already finished executing.
3. Every time `counter()` is called, `count` is **not reset** because it is stored in the closure.
*/

// ## **3. Closures and Memory Retention**
function outer() {
    let a = "I'm used in both inner functions";
    let b = "I'm used only in inner2";

    function inner1() {
        console.log(a);  // Uses 'a'
    }

    function inner2() {
        console.log(a, b); // Uses both 'a' and 'b'
    }

    return { inner1, inner2 };
}

const { inner1, inner2 } = outer();
inner1();  // 'a' is still retained
inner2();  // 'a' and 'b' are retained
/*
**What happens to memory?**
- `inner1` needs only `a`, but `b` is **not garbage collected** because `inner2` still references it.
- JavaScript's garbage collector **cannot free `b`** as long as `inner2` exists.
*/

// ## **4. Nested Closures and Variable Retention**

function parent() {
    let x = "Used in firstLevel";
    let y = "Used in secondLevel";
    
    function firstLevel() {
        console.log(x); // Uses 'x'
        
        function secondLevel() {
            console.log(y); // Uses 'y'
        }
        
        return secondLevel;
    }

    return firstLevel();
}

const closureFn = parent();  
closureFn(); // Calls secondLevel()
/*
### **Key Takeaways from This Example**
- `x` is used by `firstLevel()`, so it stays in memory as long as `firstLevel()` exists.
- `y` is used by `secondLevel()`, so it stays in memory **even though `firstLevel()` doesn’t use it directly**.
- Even if `firstLevel()` does not reference `y`, `y` is still accessible because `secondLevel()` is using it.
*/

// ## **5. When Are Variables Garbage Collected?**

function outer() {
    let data = "I am here";

    return function inner() {
        console.log(data);
    };
}

const closureRef = outer(); // `data` is retained
closureRef = null;  // Now `data` is garbage collected

/*
```
- When `closureRef` is set to `null`, the reference to `inner()` is lost.
- Since `inner()` was the only function keeping `data` alive, `data` is **garbage collected**.
*/

// ## **6. Practical Applications of Closures**
// ### **1. Data Privacy (Encapsulation)**

function counter() {
    let count = 0;

    return {
        increment: function () {
            count++;
            console.log(count);
        },
        decrement: function () {
            count--;
            console.log(count);
        },
    };
}

const myCounter = counter();
myCounter.increment(); // 1
myCounter.increment(); // 2
myCounter.decrement(); // 1
console.log(myCounter.count); // Undefined (private)


// - `count` is **not directly accessible**, making it a private variable.

// ### **2. Event Listeners and Closures**

function attachHandler() {
    let count = 0;

    document.getElementById("btn").addEventListener("click", function () {
        count++;
        console.log("Button clicked", count, "times");
    });
}

attachHandler();

// - The event listener **remembers `count`** even after `attachHandler()` has executed.

// ### **3. Function Factories**
function createMultiplier(multiplier) {
    return function (num) {
        return num * multiplier;
    };
}

const double = createMultiplier(2);
console.log(double(5)); // 10

/*
## **7. Key Takeaways**
✅ Closures allow functions to **retain access** to their parent’s variables.  
✅ Variables stay in memory as long as **at least one function still references them**.  
✅ JavaScript garbage collection **removes unused variables** when no references remain.  
✅ Closures are widely used for **data privacy, event handling, and function factories**.  
*/

/*
✔️ If a nested function references a variable, it forms a closure, keeping that variable in memory.
✔️ Even if an intermediate function does not use a variable, it is still retained if a deeper nested function needs it.
✔️ A function’s scope consists of global variables, this, parent closures, parent variables, and its own local variables.
*/