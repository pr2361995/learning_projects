import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'

function NewTask({addTaskFn}) {
  const [task_name,setTask_name] = useState("");
  function handleChange(e){
    const {value} = e.target;
    setTask_name(value);
    e.preventDefault();
  }

  function handleAddTask(e){
    addTaskFn(task_name);
    setTask_name("");
    e.preventDefault();
  }

  return (
    <div className='flex items-center gap-4'>
        <Input value={task_name} onChange={handleChange}/>
        <Button onClick={handleAddTask}>Add Task</Button>
    </div>
  )
}

export default NewTask