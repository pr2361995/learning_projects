// Start measuring total program execution time
console.time("Total_Program_Execution");

// Start measuring synchronous code execution time
console.time("Synchronous_code_execution");

// Schedule a setTimeout callback to execute after 5000ms (5 seconds)
setTimeout(() => {
    // End the "setTimeOut_expire" timer and log the time elapsed
    console.timeEnd("setTimeOut_expire");
    
    // End the "Total_Program_Execution" timer and log total execution time
    console.timeEnd("Total_Program_Execution");
}, 5000);

// Function definition: x takes a function y as an argument
function x(y) {
    console.log("x"); // Log "x"
    y(); // Execute the function y()
}

// Call function x and pass an anonymous function as an argument
x(function() { console.log("Y"); }); // Logs "Y"

// End the synchronous code execution timer and log the elapsed time
console.timeEnd("Synchronous_code_execution");

// Start a timer to measure how long until setTimeout executes
console.time("setTimeOut_expire");


/*
### **What Happens When `setTimeout` Expires?**
1. **Initial Execution (Call Stack Processes Synchronous Code)**
   - The **main script** runs first, executing all synchronous code.
   - The **call stack becomes empty** once all synchronous operations finish.

2. **SetTimeout Timer Runs in Web APIs (Asynchronous)**
   - The `setTimeout` callback is registered in the **Web API environment**.
   - The **callback queue** is empty at this moment.

3. **Timeout Expires → Callback Moves to Callback Queue**
   - When the **5-second timer expires**, the callback moves to the **callback queue**.
   - At this moment, **the callback queue is NOT empty** because it contains the `setTimeout` callback.

4. **Event Loop Moves Callback to Call Stack**
   - If the **call stack is empty**, the **event loop** moves the callback from the **callback queue** to the **call stack**.
   - The function executes (`console.timeEnd("timeout"); console.timeEnd("Total");`).

5. **After Callback Execution, the Callback Queue is Empty Again**
   - The **callback function is removed** from the call stack.
   - If no other pending tasks are waiting, the **callback queue becomes empty again**.
*/