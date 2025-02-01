console.log(foo);

var foo = "hello";

function foo(){
    console.log("Function foo");
}

console.log(foo);

/*
### **Key Takeaways:**

✅ **Hoisting with `var`**: The variable declaration (`var foo`) is hoisted but initialized as `undefined` before the assignment.  
✅ **Function Declaration Hoisting**: The function declaration (`function foo() {...}`) is hoisted entirely, and it **overwrites** the variable `foo`.  
✅ **Function vs Variable**: Even though `foo` was initially assigned `"hello"`, the function declaration takes precedence and is what gets used in the final `console.log(foo)`.
*/