function createCounter(){
    var counters = [];
    for(let i = 0 ; i < 3 ; i++ ){
        counters.push(()=>console.log(i)); // Pushes a function that logs `i`
    }
    return counters;
}

const counters = createCounter();
counters[0](); // Logs `0`
counters[1](); // Logs `1`
counters[2](); // Logs `2`

/*
### **Key Takeaways:**
✅ **Block Scoping with `let`**: Since `i` is declared with `let`, each iteration of the loop gets its own **separate** `i` variable. This is why each function logs a different value (`0`, `1`, or `2`).
✅ **Closures with Arrow Functions**: Arrow functions create closures, so they remember the value of `i` when they are created, and not when they are called. This is why each function logs the value of `i` from that specific iteration.
✅ **Why It Works as Expected**: If `var` were used instead of `let`, all functions would reference the same `i`, which would have a value of `3` after the loop finishes, causing all functions to log `3`.
*/