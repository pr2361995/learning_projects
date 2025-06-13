class Button {
    constructor(value) {
      this.value = value;
    }
  
    click() {
      alert(this.value);
    }
  }
  
  let button = new Button("hello");
  
  setTimeout(button.click, 1000); // undefined

// overcome this problem by using arrow function
// arrow function does not have its own this. it takes this from the parent scope

// setTimeout(() => button.click(), 1000);

// class Button {
//     constructor(value) {
//       this.value = value;
//     }
  
//     click = () => {   
//         alert(this.value);
//     }
// }

// let button2 = new Button("hello");
// setTimeout(button2.click, 1000); // hello



