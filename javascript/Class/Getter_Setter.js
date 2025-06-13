class User {
    #name = null; // private field declaration , not exposed to the outside world
    constructor(name) {
      this.name = name;
    }
  
    get name() {
      return this.#name + " is a good boy";
    }
  
    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this.#name = value;
    }
  
}

// getter and setter
// get the name called from constructor. before get the value do modification and change the value
// set the name called from constructor. before set the value do modification and validation
// set value field is different from the constructor field. because same field name is used it will make the loop


let user = new User("prasanth");
console.log(user.name);
