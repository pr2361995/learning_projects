import React from 'react'
import Button from './Button'

function ProjectsSidebar({onStartAddProject,project,handleSelectProject}) {
  return (
    <aside className='w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl'>
        <h2 className='mb-8 font-bold upppercase md:text-xl text-stone-200'>Your Projects</h2>
        <div>
            <Button onClick={onStartAddProject}>+ Add Project</Button>
        </div>
        <ul className='mt-8'>
          {
            project.projects.map(proj => {
              let baseclass = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
              if(proj.id === project.selectedProjectId)
                baseclass += " bg-stone-800 text-stone-200 "
              else 
                baseclass += " text-stone-400  "
              return <li key={proj.id}>
                        <button className={baseclass} onClick={()=> handleSelectProject(proj.id)}>
                          {proj.title}
                        </button>
                      </li>
            })
          }
        </ul>
    </aside>
  )
}

export default ProjectsSidebar