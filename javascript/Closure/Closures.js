/*
  When a function is executed, 
  its local variables are typically removed from memory after execution is complete. 
  However, if an inner function (nested function) references those local variables, 
  a closure is created, and those variables are stored in a separate closure memory.

  Key Concepts
    1. Local variables exist in function execution context
        When a function runs, it creates a new execution context (including a memory space for its local variables).
        Normally, this memory is cleared after function execution.
    2. Closures preserve variables
        If an inner function uses variables from its outer function, JavaScript doesn’t garbage collect them.
        Instead, those variables move into closure memory and stay as long as the inner function exists.
*/

let block_scope = "block_scope"; // Global block-scoped variable
var gloabl_scope = "gloabl_scope"; // Global function-scoped variable
debugger;

function gloabl_function(params) { 
  debugger;
  var grantParent_function_scope = "grantParent_function_scope"; 
  return function parent() {
    debugger;
    var parent_function_scope = "parent_function_scope";
    var parent_function_scope_2 = "parent_function_scope_2";

    console.log(grantParent_function_scope); 
    // ✅ Accessible due to closure (enclosed by `gloabl_function`)

    console.log(block_scope); 
    // ✅ Accessible block_scope is inside `global_function`

    return function child() {
      debugger;
      console.log(gloabl_scope); 
      // ✅ Accessible from global scope (hoisted `var` variable)

      console.log(parent_function_scope_2); 
      // ✅ Accessible due to closure (enclosed by `parent` function)

      console.log(params); 
      // ✅ Accessible due to closure (enclosed by `gloabl_function`)
    };
  };
} 


const gloabl_function_return =  gloabl_function(block_scope)
gloabl_function_return()()

/*
### **Key Takeaways**  
✅ **Closures allow functions to access variables from their parent function scope even after the parent function has executed.**  
✅ **The `var` keyword hoists variables to the top of their scope, making them accessible anywhere in the function they are declared in.**  
✅ **The `let` keyword does not get stored in the global memory and is not available inside functions unless explicitly passed.**  
✅ **Each nested function retains access to the variables declared in its parent function due to closures.**  
✅ **`debugger;` helps step through execution and inspect closures in the browser console.**  
*/