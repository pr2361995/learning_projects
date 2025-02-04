function encapsulation() {
    let click_count = 0;  // Private variable (not accessible outside this function)
    
    return {
        increment: function() {
            click_count++;
            console.log(`Current Count: ${click_count}`);
        },
        decrement: function() {
            click_count--;
            console.log(`Current Count: ${click_count}`);
        }
    };
}

// First instance of encapsulation()
const { increment, decrement } = encapsulation(); 

increment(); // Output: Current Count: 1
decrement(); // Output: Current Count: 0
increment(); // Output: Current Count: 1
increment(); // Output: Current Count: 2

console.log("---------------");

// Second instance of encapsulation()
const { increment: i2, decrement: d2 } = encapsulation(); 

i2(); // Output: Current Count: 1
i2(); // Output: Current Count: 2
i2(); // Output: Current Count: 3
i2(); // Output: Current Count: 4
d2(); // Output: Current Count: 3

console.log("---------------");

// Using the first instance again
increment(); // Output: Current Count: 3 (Continues from the first instance)

/*
## **Key Takeaways**
✅ **Encapsulation & Closures:**  
   - The `click_count` variable is **private** and only accessible through the returned functions.

✅ **New Instance = New `click_count`**  
   - Each call to `encapsulation()` **creates a separate counter**.

✅ **Destructuring Does Not Merge Instances**  
   - `const { increment, decrement } = encapsulation();` extracts methods from **one instance**.
   - `const { increment: i2, decrement: d2 } = encapsulation();` extracts methods from **another instance**.

✅ **Instance 1 and Instance 2 are independent**  
   - The first `increment()` call after the second instance still refers to the first instance.
*/