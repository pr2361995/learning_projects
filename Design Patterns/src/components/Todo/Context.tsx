import React, { createContext, useContext, useReducer, useState } from "react";
import {Todo} from "./TodoAdd";

interface TodoContextType {
    todos : Todo[];
    filteredTodos: Todo[];
    filterStatus: "All" | "Done" | "Active";
    addTodo : (todo : Todo) => void;
    updateTodo : (todo : Todo) => void;
    deleteTodo : (id : number) => void;
    changeStatus : (id: number, status: "Done" | "Active") => void;
    setFilter: (filter: "All" | "Done" | "Active") => void;
}

export const TodoContext = createContext<TodoContextType>({
    todos: [] as Todo[],
    filteredTodos: [] as Todo[],
    filterStatus: "All",
    addTodo: () => {},
    updateTodo: () => {},
    deleteTodo: () => {},
    changeStatus: () => {},
    setFilter: () => {}
});

const initialState = {
    todos: [] as Todo[],
    filterStatus: "All"
}

const reducer = (state:typeof initialState,action:any) => {
    switch(action.type){
        case "ADD_TODO":
            return {
                ...state,
                todos: [...state.todos,action.payload]
            }
        case "UPDATE_TODO":
            return {
                ...state,
                todos: state.todos.map(todo => action.payload.id === todo.id ? action.payload : todo)
            }
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        case "CHANGE_STATUS":
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id ? {...todo,status:action.payload.status} : todo)
            }
        case "SET_FILTER":
            return {
                ...state,
                filterStatus: action.payload
            }
        default:
            return state;
    }
}


export const TodoProvider = ({children}:{children:React.ReactNode}) => {
    const [state,dispatch] = useReducer(reducer,initialState);

    
    return (
        <TodoContext.Provider value={{
            todos:state.todos,
            filteredTodos:state.todos.filter(todo => state.filterStatus === "All" ? true : todo.status === state.filterStatus),
            filterStatus:state.filterStatus,
            addTodo: (todo:Todo) => dispatch({type:"ADD_TODO",payload:todo}),
            updateTodo: (todo:Todo) => dispatch({type:"UPDATE_TODO",payload:todo}),
            deleteTodo: (id:number) => dispatch({type:"DELETE_TODO",payload:id}),
            changeStatus: (id:number,status:"Done" | "Active") => dispatch({type:"CHANGE_STATUS",payload:{id,status}}),
            setFilter: (filter:"All" | "Done" | "Active") => dispatch({type:"SET_FILTER",payload:filter})
        }}>
            {children}
        </TodoContext.Provider>
    )
};

export function useTodoContext(){
    const context = useContext(TodoContext);
    if(!context){
        throw new Error("useTodoContext must be used within a TodoProvider");
    }
    return context;
}

