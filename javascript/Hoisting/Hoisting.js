let block_scope = "original value"; // Global block-scoped variable
var global_scope = "original value"; // Global function-scoped variable

function global_function() {
  console.log("Before declaration, block_scope:", block_scope); 
  // access 'block_scope' before initialization,a hoisted var block_scope (which is undefined) already exists inside the function. 
  // runs, JavaScript does not use the global block_scope because a hoisted var block_scope (which is undefined) already exists inside the function. 
  
  var block_scope = "re-declared value"; // ✅ Hoisted at the top (initialized as undefined)
  
  block_scope = "reassigned value"; // ✅ Affects the local `block_scope` inside function, NOT global one
  
  console.log("Local block_scope:", block_scope); // Prints "reassigned value"
}

global_function();

console.log("Global block_scope:", block_scope); // Still "original value"

/*
## **Key Takeaways**
✅ **Hoisting affects `var`, not `let` or `const`.**  
✅ **JavaScript looks for the nearest variable declaration (inside function scope first).**  
✅ **Variables declared with `var` are hoisted and initialized as `undefined`.**  
✅ **Modifying a function's local `var` variable does NOT affect global `let` variables.**  
*/