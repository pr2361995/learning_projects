console.time("Total Execution Time");
// Creating a promise that resolves after 20 seconds
const promiseTwo = new Promise((resolve) => {
    console.log("Promise 20s before");
    setTimeout(() => {
        resolve("Promise Two resolved after 20 seconds");
    }, 20000);
});

// Creating a promise that resolves after 10 seconds
const promiseOne = new Promise((resolve) => {
    console.log("Promise 10s before");
    setTimeout(() => {
        resolve("Promise One resolved after 10 seconds");
    }, 10000);
});

// Async function to handle both promises
async function handlePromises() {
    console.timeLog("Total Execution Time");

    const resultTwo = await promiseTwo; // Waits for second promise (20s)
    console.log(resultTwo);
    console.timeLog("Total Execution Time");

    const resultOne = await promiseOne; // Waits for first promise (10s)
    console.log(resultOne);
    console.timeEnd("Total Execution Time");
}

// Execute the async function
handlePromises();
