import React, { useState } from 'react'
import { useTodoContext } from './Context';

const inputStyle = {
    padding:"10px",
    borderRadius:"5px",
    border:"1px solid #000",
    outline:"none"
}


function Filter() {
    const {setFilter} = useTodoContext();

    function changeFilter(e){
        const status = e.target.value;
        setFilter(status as "All" | "Done" | "Active")
    }

    return (
        <select onChange={changeFilter} style={inputStyle}>
            <option value="All">All</option>
            <option value="Done">Done</option>
            <option value="Active">Active</option>
        </select>
    )
}

export default Filter
