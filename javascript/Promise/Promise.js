
// ## ✅ **`async` - Always Returns a Promise**  
// Even if an `async` function returns a **primitive value**, it is **implicitly wrapped** in a Promise.

async function returnPrimitive() {
    return 42; // Returns a number
}

console.log(returnPrimitive()); // Output: Promise { 42 }
// 🔹 Even though `42` is a number, the function **implicitly** returns `Promise.resolve(42)`.

async function returnPromise() {
    return Promise.resolve(100);
}

returnPromise().then(console.log); // Output: 100
// 🔹 If a function **already returns a promise**, `async` does **not** wrap it again.

/*
## ✅ **`await` - Suspends Execution Until the Promise Resolves**
- `await` **pauses the function execution** until the **promise is resolved**.
- Can **only be used inside `async` functions**.
*/

async function demoAwait() {
    console.log("Before await");

    const value = await Promise.resolve("Resolved value");
    console.log(value); // Output: "Resolved value"

    console.log("After await");
}

demoAwait();
// 🔹 The function execution **pauses** at `await` until the promise resolves, then continues.


/*
## ✅ **Using `await` in Front of a Non-Promise Value**
If you `await` a non-promise, JavaScript **automatically wraps it in a resolved Promise**.
*/
async function demoNonPromise() {
    const number = await 99; // JS converts this to Promise.resolve(99)
    console.log(number); // Output: 99
}

demoNonPromise();
// 🔹 **Even though `99` is a number,** `await` makes it behave like `Promise.resolve(99)`.

/*
## ✅ **Key Takeaways**
1️⃣ **`async` always returns a promise**, even if returning a primitive.  
2️⃣ **`await` must be inside an `async` function** and suspends execution until the promise resolves.  
3️⃣ **`await` works on non-promises** by converting them into resolved promises automatically.  
*/