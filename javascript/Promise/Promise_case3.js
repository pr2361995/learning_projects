
// ### **❌ Wrong Way (Sequential Execution)**
async function sequential() {
    console.time("Sequential Execution Time");
    console.timeLog("Sequential Execution Time");
    debugger; // 1

    let p1 = await new Promise(res => setTimeout(() => res("Sequential Task 1 Done"), 2000));
    debugger; // 3
    let p2 = await new Promise(res => setTimeout(() => res("Sequential Task 2 Done"), 3000));
    debugger; // 5
    console.log(p1, p2); // Total time = 2s + 3s = 5s
    console.timeEnd("Sequential Execution Time");
}

sequential();
// ⏳ **Takes 5 seconds** because each `await` waits for the previous task to finish.

// ### **✅ Right Way (Parallel Execution)**
async function parallel() {
    console.time("Parallel Execution Time");
    console.timeLog("Parallel Execution Time");
    debugger; // 2

    let [p1, p2] = await Promise.all([
        new Promise(res => setTimeout(() => res("Parallel Task 1 Done"), 2000)),
        new Promise(res => setTimeout(() => res("Parallel Task 2 Done"), 3000))
    ]);
    debugger; // 4
    console.log(p1, p2); // Total time = max(2s, 3s) = 3s
    console.timeEnd("Parallel Execution Time");
}

parallel();
// 🚀 **Executes in 3 seconds instead of 5!** Because both promises start at the same time.
