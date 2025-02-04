function parent() {
    let a = 10; // Used by first-level function
    let b = 20; // Used by second-level function
    
    function firstLevel() {
        console.log(a); // Uses 'a', forms a closure around 'a'
        
        function secondLevel() {
            console.log(b); // Uses 'b', forms a closure around 'b'
        }
        return secondLevel;
    }
    
    return firstLevel();
}

const closureFn = parent(); 
closureFn(); // Calls secondLevel()

/*
1. When `parent()` runs:
   - It creates `a = 10` and `b = 20` in its execution context.
   - It defines `firstLevel`, which **captures `a`** (forms a closure).
   - It then calls `firstLevel()`, which defines `secondLevel` and **captures `b`** (forms another closure).
   - `firstLevel` **no longer needs `b`**, but `b` is still available because `secondLevel` is using it.
   
2. **Key Observation:**
   - Even though `firstLevel` is not using `b`, `b` remains in memory because **it is still referenced by `secondLevel`**.
   - Closure retains variables **even if an intermediate function does not use them directly**.
   - Garbage collection does not remove `b` because it's still required.
*/

/*
Answer to Your Doubt

Yes, even if a variable is **not used in an intermediate function**, 
it will still be available to the next-level nested function **if that function references it**. 
The JavaScript engine keeps variables alive in closures as long as **at least one function still has access to them**.

Once all functions that reference a variable are removed (no longer reachable), 
the garbage collector can reclaim the memory.
*/