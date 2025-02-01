import React, { ChangeEvent, useRef, useState } from 'react'
import Todo from '../modals/todo'
import TodoItem from './TodoItem';
import styles from "./Todos.module.css";
/* 
  React.FC
    * React.FC is a type for a component, not a return type.
    * When you want automatic inference for props and better readability
    * A React component function should return JSX.Element or React.ReactElement, not React.FC.


  Regular function with React.ReactElement
    * When you want a more explicit return type and 
        avoid children being automatically included

*/

const Todos : React.FC = () => {
  const [todos,setTodos] = useState<Todo[]>([]);
  const todoRef = useRef<HTMLInputElement>(null);

  function addTodoList(){
    if(todoRef.current && todoRef.current.value.trim().length === 0)
      return;  
    const newTodo = new Todo(todoRef.current!.value);
    setTodos(prevTodos => [newTodo,...prevTodos]);
    todoRef.current!.value = "";
  }

  function removeTodoList(id:string){
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  return (
    <div>
      <input type="search" ref={todoRef}/>
      <button /*disabled={
        todoRef.current && todoRef.current.value.trim().length === 0 ? 
          true 
        : 
          false}*/ onClick={()=>addTodoList()}>
            Add Todo
      </button>
      <ul className={styles.todos}>
        {
          todos.map(todo => 
            <TodoItem key={todo.id} removeOn={() => removeTodoList(todo.id)}>
              {todo.name}
            </TodoItem>
          )
        }
      </ul>
    </div>
  )
}

export default Todos