let block_scope = "original value"; // Global block-scoped variable
var global_scope = "original value"; // Global function-scoped variable

function global_function() {
  let block_scope = "re-declared value"; // ✅ Allowed (new local scope)
  block_scope = "reassigned value"; // ✅ Updates local `block_scope`
  debugger; 
  console.log("Local block_scope:", block_scope); // Prints "reassigned value"
}

global_function();

console.log("Global block_scope:", block_scope); // Still "original value"

/*
### **Key Takeaways**  
✅ **`let` allows re-declaration inside a different scope (e.g., inside a function).**  
✅ **Variables declared with `let` inside a function do not affect global `let` variables.**  
✅ **Reassigning a local variable only affects that function's execution.**  
✅ **Global `let` variables remain unchanged if a local variable with the same name exists.**  
*/