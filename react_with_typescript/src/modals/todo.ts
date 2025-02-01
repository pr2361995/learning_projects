class Todo {
  id : string;
  name : string;
  constructor(name:string){
    this.name = name
    this.id = new Date().toString()
  }
}

export default Todo;