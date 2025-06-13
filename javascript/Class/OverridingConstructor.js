// class extends another class and has no constructor ,
// then the following “empty” constructor is generated:

// class Rabbit extends Animal {
//     constructor(...args) {
//         super(...args);
//     }
// }

// The short answer is: constructors in inheriting classes must call super(...) , and (!) do it
// before using this .


// When a normal constructor runs, it creates an empty object as this and continues with it.
// But when a derived constructor runs, it doesn’t do it. It expects the parent constructor to do
// this job.
// So if we’re making a constructor of our own, then we must call super , because otherwise the
// object with this reference to it won’t be created. And we’ll get an error.

class Animal {
}

const cow = new Animal();
console.log(cow);





