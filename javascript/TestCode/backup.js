let count = 0;

// Function to fetch data from API
async function fetchUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error('Error fetching data:', error);
        showError('Failed to load users');
    }
}

// Function to render users in the UI
function renderUsers(users) {
    const parent = document.querySelector('.parent');
    
    // Render each user in a card
    users.forEach(user => {
        const childDiv = document.createElement('div');
        childDiv.className = 'child';
        
        childDiv.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Company: ${user.company.name}</p>
            <p>Website: ${user.website}</p>
            <p>City: ${user.address.city}</p>
        `;
        
        // Add click event to show more details
        childDiv.addEventListener('click', () => {
            showUserDetails(user);
        });
        
        parent.appendChild(childDiv);
    });
}

// Function to show detailed user information
function showUserDetails(user) {
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'feedback user-details';
    detailsDiv.style.cssText = `
        color: #333;
        font-size: 14px;
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
        background-color: #f0f0f0;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    detailsDiv.innerHTML = `
        <h4>Detailed Information</h4>
        <p>Username: ${user.username}</p>
        <p>Phone: ${user.phone}</p>
        <p>Address: ${user.address.street}, ${user.address.suite}</p>
        <p>Zipcode: ${user.address.zipcode}</p>
        <p>Company Details:</p>
        <p>• ${user.company.catchPhrase}</p>
        <p>• ${user.company.bs}</p>
    `;
    
    // Remove old details if exists
    const oldDetails = document.querySelector('.user-details');
    if (oldDetails) {
        oldDetails.remove();
    }
    
    // Add new details
    document.querySelector('.button-container').appendChild(detailsDiv);
    
    // Trigger animation
    requestAnimationFrame(() => {
        detailsDiv.style.opacity = '1';
    });
}

// Function to show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'feedback error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: white;
        background-color: #F44336;
        padding: 10px;
        border-radius: 5px;
        margin: 10px;
        text-align: center;
    `;
    
    document.querySelector('.button-container').appendChild(errorDiv);
}

// Original handleClick function with added API call
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
    console.log("Next sibling (includes text nodes):", button.nextSibling);
    console.log("Next element sibling (only elements):", button.nextElementSibling);
    console.log("Previous sibling:", button.previousSibling);
    console.log("Previous element sibling:", button.previousElementSibling);
    
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
    
    // Remove old feedback if exists
    const oldFeedback = document.querySelector(".feedback");
    if (oldFeedback) {
        oldFeedback.remove();
    }
    
    // Add to DOM using insertAfter
    feedback.classList.add("feedback");
    
    // Method 1: Using insertBefore with nextSibling
    button.parentNode.insertBefore(feedback, button.nextSibling);
    
    // Force a reflow by accessing offsetHeight
    feedback.offsetHeight;
    
    // Now set opacity to trigger transition
    requestAnimationFrame(() => {
        feedback.style.opacity = "1";
    });

    // Fetch and display user data after showing click feedback
    fetchUserData();
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