import React from 'react'
import NewTask from './NewTask';
import Button from './Button';

function Tasks({project_id,addTaskFn,removeTaskFn,tasks}) {
  return (
    <section>
        <h2 className='text-2xl font-bold text-stone-700 mb-4'>Tasks</h2>
        <NewTask addTaskFn={addTaskFn}/>
        { tasks.length > 0 && 
            <ul className='p-4 mt-8 rounded-md bg-stone-100'>
                {tasks.map(tk => <li key={tk.task_id} className='flex justify-between my-4'>
                    <span className='text-stone-800'>
                        {tk.task_name}
                    </span>
                    <button className='text-stone-700 hover:text-red-500' onClick={() => removeTaskFn(tk.task_id)}>Clear</button>
                </li>)}
            </ul>
        }
        {tasks.length <= 0 && <p className='text-stone-800 mb-4'>
            This project does not have any tasks yet.
        </p>}
    </section>
  )
}

export default Tasks