import React from 'react';
import { useTodoContext } from './Context';

const todoStyle = {
    listStyle:"none",
    display:"flex",
    maxWidth:"300px",
    justifyContent:"space-between",
    alignItems:"center",
    border:"1px solid #000",
    padding:"10px",
    borderRadius:"5px",
    margin:"10px",
    backgroundColor:"#f0f0f0",
    color:"#000"
}

const containerStyle = {
    display:"flex",
    gap:"10px",
    margin:"10px",
    padding:"10px",
}

const TodoList = () => {
    const {filteredTodos,changeStatus} = useTodoContext();


    return (
            filteredTodos.length === 0 ? <div style={containerStyle}>No todos found</div> :
            <ul style={{margin:"10px",padding:"0"}}>
                {
                    filteredTodos.map(todo => 
                        <li key={todo.id.toString()} style={todo.status === "Active" ? 
                            todoStyle : 
                            {...todoStyle,textDecoration:"line-through"}}>
                            {todo.name}
                            <span>
                                <input 
                                    type='checkbox'
                                    disabled={todo.status === "Done"}
                                    checked={todo.status !== "Active"} 
                                    onChange={(e) => changeStatus(todo.id,e.target.checked ? "Done" : "Active")}/>
                            </span>
                        </li>)
                }
            </ul>
        )
}

export default TodoList;