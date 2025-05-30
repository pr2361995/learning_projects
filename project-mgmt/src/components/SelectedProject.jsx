import React from 'react'
import Tasks from './Tasks';

function SelectedProject({project,handleDelete,...taskProps}) {
    const {title,description,due_date,id} = project
    const formateDate = new Date(due_date).toLocaleDateString("en-Us",{
        year : 'numeric',
        month : 'short',
        day : 'numeric'
    });

  return (
    <div className='w-[35rem] mt-16'>
        <header className='pb-4 border-b-2 border-stone-300 mb-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-stone-600 mb-2'>{title}</h1>
                <button className='text-stone-600 hover:text-stone-950' onClick={() => handleDelete(id)}>Delete</button>
            </div>
            <p className='mb-4 text-stone-400'>{formateDate}</p>
            <p className='text-stone-600 whitespace-pre-wrap'>{description}</p>
        </header>
        <div>
            <Tasks {...taskProps} project_id={id}/>
        </div>
    </div>
  )
}

export default SelectedProject