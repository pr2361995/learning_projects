if (!Array.prototype.customForEach) {
    Array.prototype.customForEach = function(callback, thisArg) {
        let arr = this;
        let length = arr.length;
        for (let i = 0; i < length; i++) {
            callback.call(thisArg,arr[i], i, arr);
        }
    };
}

const numbers = [1, 2, 3, 4, 5];
numbers.customForEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

if(!Array.prototype.customMap){
    Array.prototype.customMap = function(cb,thisArg){
        console.log(thisArg);
        const arr = this;
        let arrLength = this.length;
        let result = [];
        for(let i = 0 ; i < arrLength ; i++){
            result.push(cb.call(thisArg,arr[i],i,arr))
        }
        return result;
    }
}

[2,3].customMap((item,index,arr)=>{
    console.log(item,index,arr);
});

const person = {
    name: "John",
    greet: function(prefix) {
        return prefix + " " + this.name;
    }
};

const prefixes = ["Hello", "Hi", "Hey"];

console.log(prefixes.customMap(person.greet)); 

console.log(prefixes.customMap(person.greet, {name:"prasanth"})); 