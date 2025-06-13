function moveAllZeroAtEnd(list) {
    if (!list || !list.length) {
        throw new Error("List is empty");
    }
    let nonZeroIndex = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i] !== 0) {
            [list[nonZeroIndex], list[i]] = [list[i], list[nonZeroIndex]];
            nonZeroIndex++;
        }
    }
    
    return list;
}
console.log(moveAllZeroAtEnd([0, 0, 1]));     
console.log(moveAllZeroAtEnd([0, 1, 0, 3, 12])); 
console.log(moveAllZeroAtEnd([1, 2, 3]));     
console.log(moveAllZeroAtEnd([0, 0, 0]));     