function buttonEventListener(){
    let click_count = 0, // Private variable (closure scope)
    button = document.getElementById("click_button");

    if(!button) return; // Ensure button exists

    // Define the event handler separately
    function click_event_handler() {
        console.log("button clicked count: ", click_count++);
    }
    
    // Remove existing listener before adding a new one
    button.removeEventListener('click',click_event_handler);
    button.addEventListener('click',click_event_handler)
}
// Call the function to attach the event listener
buttonEventListener();