
let block_scope = "original value"; // ✅ Declared in the global scope
var global_scope = "original value"; // ✅ Declared in the global scope

let block_scope = "re-declared value"; 
// ❌ Since `block_scope` is already declared in the same scope, JavaScript **does not allow redeclaration** using `let`.
var gloabl_scope = "re-declared value";
/*
### **Key Takeaways**  

✅ **`let` and `const` cannot be redeclared in the same scope.**  
✅ **`var` can be redeclared in the same scope without errors.**  
✅ **To avoid errors, use different variable names or declare `let` in a new block.**  
*/