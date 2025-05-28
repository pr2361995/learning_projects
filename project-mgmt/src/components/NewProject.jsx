import React, { useState, useRef } from 'react'
import Input from './Input'
import Modal from './Modal';

function NewProject({handleAddProject}) {
    const modal = useRef();
    const [formState,setFormState] = useState({
        title : "",
        description : "",
        due_date : ""
    });

    function addProjectValidate(){
        const {description,title,due_date} = formState;
        return title && title.trim() !== "" && 
        description && description.trim() !== "" && 
        due_date && due_date.trim() !== "";
      }

    function handleSave(){
        if(addProjectValidate())
            handleAddProject({...formState,id:Math.random()});
        else 
            modal.current.open();
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormState(prevState =>({
        ...prevState,
        [name]:value
        }));
        e.preventDefault();
    }

  return (
    <>
    <Modal ref={modal} buttonCaption="Okey">
        <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
        <p className='text-stone-400 mb-4 '>Oops... looks like you forget to enter a value.</p>
        <p className='text-stone-400 mb-4 '>Please make sure provide a valid for every input field.</p>
    </Modal>
    <div className='w-[35rem] mt-16'>
        <menu className='flex items-center justify-end gap-4 my-4 '>
            <li>
                <button className='text-stone-800 hover:text-stone-900'>Cancel</button>
            </li>
            <li>
                <button className='bg-slate-800 text-slate-50 hover:bg-slate-950 rounded-md py-2 px-6' onClick={handleSave}>Save</button>
            </li>
        </menu>
        <div>
            <Input label={"Title"}  name="title" value={formState.title} onChange={handleChange}/>
            <Input label={"Description"} textarea name="description" value={formState.description} onChange={handleChange}/>
            <Input label={"Due Date"} type="date" name="due_date" value={formState.due_date} onChange={handleChange}/>
        </div>
    </div>
    </>
  )
}

export default NewProject