import React, { useState } from 'react'
import { useTodoContext } from './Context';

export interface Todo {
    id : number;
    name : string;
    status : "Done" | "Active"  ;
}


const inputStyle = {
    padding:"10px",
    borderRadius:"5px",
    border:"1px solid #000",
    outline:"none"
}


const containerStyle = {
    display:"flex",
    gap:"10px",
    margin:"10px",
    padding:"10px",
}

function TodoAdd({ 
    filter,
    todoList,
}:{
    filter:React.ReactNode,
    todoList:React.ReactNode,
}) {
    const {addTodo} = useTodoContext();
    
    const [inputValue, setInputValue] = useState("");
    
    function addTodoList(){
        if(inputValue.trim()){
            addTodo({
                id : Math.random(),
                name : inputValue,
                status:"Active"
            })
            setInputValue("");
        }
    }

    return (
        <>
            <h1>Todo List</h1>
            <div style={containerStyle}>
                <input 
                    type="text" 
                    placeholder='create todo' 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={inputStyle}
                />
                <button
                    disabled={inputValue.trim().length < 3}
                    onClick={addTodoList} 
                    style={inputStyle}>
                        Create Todo
                </button>
                {filter}
            </div>
            {todoList}
        </>
    )
}

export default TodoAdd;