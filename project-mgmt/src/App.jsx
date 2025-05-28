import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState,setProjectState] = useState({
    selectedProjectId : undefined,
    projects  : [] ,
    tasks     : []
  });

  console.log("projectState",projectState);

  function handleStartAddProject(){
    setProjectState(prevState => ({
      ...prevState,
      selectedProjectId: null
    }));
  }

  let seletedProject = projectState.projects.find(proj => proj.id === projectState.selectedProjectId)

  function handleSelectProject(id){
    setProjectState(prevState => ({
      ...prevState,
      selectedProjectId:id
    }))
  }

  function handleAddTask(task_name){
    setProjectState(prevState => {
      const project_id = prevState.selectedProjectId;
      return ({
      ...prevState,
      tasks : [{project_id,task_id:Math.random(),task_name},...prevState.tasks]
    })
  })
  }

  function handleRemoveTask(task_id){
    setProjectState(prevState => ({
      ...prevState,
      tasks : prevState.tasks.filter(tk => tk.project_id !== prevState.selectedProjectId && tk.task_id !== task_id)
    }))
  }

  function handleDelete(id){
    setProjectState(prevState => ({
      ...prevState,
      selectedProjectId: undefined,
      projects : prevState.projects.filter(proj => proj.id !== id)
    }))
  }

  function handleAddProject(data){
      setProjectState(prevState => ({
        ...prevState,
        selectedProjectId : data.id,
        projects : [data,...prevState.projects] 
      }));
  }

  let content;

  if(projectState.selectedProjectId === null){
    content = <NewProject handleAddProject={handleAddProject}/>
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }else 
    content = <SelectedProject 
      project={seletedProject} 
      addTaskFn={handleAddTask} 
      removeTaskFn={handleRemoveTask} 
      handleDelete={handleDelete}
      tasks={projectState.tasks.filter(tk => tk.project_id === projectState.selectedProjectId)}/>

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onStartAddProject={handleStartAddProject} 
        project={projectState} 
        handleSelectProject={handleSelectProject}/>
      {content}
    </main>
  );
}

export default App;
