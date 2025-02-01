/*
console.log(block_scope); inside child() prints "grantParent block_scope".

✅ Since child() is inside parent(), and parent() is inside gloabl_function(), it has access to block_scope from gloabl_function() due to closures.

✅ The global block_scope ("block_scope") is not used because the function chain closes over "grantParent block_scope".  
*/


let block_scope = "block_scope"; // Global block-scoped variable
debugger;

function gloabl_function() { 
  let block_scope = "grantParent block_scope"; 
  debugger;
  console.log(block_scope); // "grantParent block_scope"
  
  return function parent() {
    console.log(block_scope); // "grantParent block_scope"
    
    return function child() {
      debugger;
      console.log(block_scope); // "grantParent block_scope"
      block_scope = "Child block_scope changed"; 
      console.log(block_scope); // "Child block_scope changed"
    };
  };
}

const gloabl_function_return =  gloabl_function();
gloabl_function_return()(); // Calls parent(), then child()


/*
### **Key Takeaways**  

✅ **Closures allow inner functions to access outer function variables, even after the outer function has finished executing.**  
✅ **Changes inside the inner function (`child()`) modify its own `block_scope`, which is local to the closure.**  
✅ **Global `block_scope` remains unchanged because the modification only affects the local function scope.**  
✅ **The variable `block_scope` inside the `child()` function is different from the global one, even though they share the same name.**  
*/