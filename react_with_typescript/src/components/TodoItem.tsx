import React from 'react'
import classes from './TodoItem.module.css';

interface TodoItemProps {
    removeOn    : () => void;
    children    : React.ReactNode;
}

const TodoItem : React.FC<TodoItemProps> = (props) => {
  return (
    <li className={classes.item} onClick={()=> props.removeOn()}>
        {props.children}
    </li>
  )
}

export default TodoItem