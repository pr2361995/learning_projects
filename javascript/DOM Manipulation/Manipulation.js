let count = 0;

function handleClick(){
    console.log("button clicked",++count);
    
    // Get the button element
    const button = document.getElementById("click_button");
    
    // This shows HTML representation in console
    console.log("Button as HTML:", button);

    // This shows it's actually an object
    console.log("Button is an object:", typeof button);
    console.log("Button constructor:", button.constructor.name);
    
    // Show sibling relationships
    // console.log("Next sibling (includes text nodes):", button.nextSibling);
    // console.log("Next element sibling (only elements):", button.nextElementSibling);
    // console.log("Previous sibling:", button.previousSibling);
    // console.log("Previous element sibling:", button.previousElementSibling);
    
    // DOM manipulation happens after initial render
    button.classList.add("active");
    button.classList.toggle("highlight");
    console.log("After class changes:", button.className);
    
    // Style changes trigger reflow/repaint
    button.style.backgroundColor = count % 2 === 0 ? "#4CAF50" : "#2196F3";
    
    // Creating new element and adding to DOM
    const feedback = document.createElement("div");
    // This will show <div> in console but it's also an object
    console.log("New div element:", feedback);
    console.log("Div is an object:", typeof feedback);
    
    feedback.textContent = `Clicked ${count} times!`;
    
    // First set up the element
    feedback.style.cssText = `
        color: #333;
        font-size: 18px;
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
        background-color: #f0f0f0;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Different ways to remove old feedback if exists
    const oldFeedback = document.querySelector(".feedback");
    if (oldFeedback) {
        // Method 1: Using remove() (modern)
        oldFeedback.remove();
        
        // Method 2: Using parentNode.removeChild (older browsers)
        // oldFeedback.parentNode.removeChild(oldFeedback);
        
        // Method 3: Using parentElement
        // oldFeedback.parentElement.removeChild(oldFeedback);
        
        // Method 4: Using replaceWith (removes and can replace in one step)
        // oldFeedback.replaceWith(feedback);
        
        console.log("Old feedback removed");
    }
    
    // Add to DOM using insertAfter
    feedback.classList.add("feedback");
    
    // Method 1: Using insertBefore with nextSibling
    button.parentNode.insertBefore(feedback,button.nextSibling);
    
    // Alternative methods (commented out):
    // Method 2: Using after() method
    // button.after(feedback);
    
    // Method 3: Using insertAdjacentElement
    // button.insertAdjacentElement('afterend', feedback);
    
    // Force a reflow by accessing offsetHeight
    feedback.offsetHeight;
    
    // Now set opacity to trigger transition
    requestAnimationFrame(() => {
        feedback.style.opacity = "1";
    });
}

function attachEventListeners(){
    // Wait for DOM to be fully loaded
    window.onload = function(){
        console.log("DOM fully loaded");
        
        var elem = document.getElementById("click_button");
        if (elem !== null) {
            // Initial styles
            elem.style.cssText = `
                padding: 15px 30px;
                font-size: 16px;
                cursor: pointer;
                border: none;
                border-radius: 5px;
                background-color: #4CAF50;
                color: white;
                transition: all 0.3s ease;
            `;
            
            // Event listener attached after styles
            elem.addEventListener("click", handleClick, true);
            console.log("Event listener attached");
        }
    };
}

// Start attaching events after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded");
    attachEventListeners();
});

// // Method 1: Using classList.contains()
// if (button.classList.contains("active")) {
//     console.log("Button has 'active' class");
// }

// // Method 2: Using className.includes()
// if (button.className.includes("active")) {
//     console.log("Found 'active' using className");
// }

// // Method 3: Using matches() with class selector
// if (button.matches(".active")) {
//     console.log("Element matches '.active' selector");
// }