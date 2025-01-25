import React, { useRef, useState } from 'react'
import ListItem from './ListItem';

function SearchableList({items,children,getId}) {
    const [searchTerm,setSerchTerm] = useState(""),
    searchRef = useRef(),
    filteredValue = items.filter(item => JSON.stringify(item).toLocaleLowerCase().includes(searchTerm))
    
    function handleChange(event){
        if(searchRef.current)
            clearTimeout(searchRef.current);

        searchRef.current = setTimeout(()=>{
            searchRef.current = null;
            setSerchTerm(event.target.value)
        },500)
        event.preventDefault();
    }
    
    return (
        <div className='searchable-list'>
            <input type='search' onChange={handleChange} placeholder='Type here...'/>
            <ul>
                {
                    filteredValue.map((item)=> <ListItem key={getId(item)}>{children(item)}</ListItem>)
                }
            </ul>
        </div>
    )
}

export default SearchableList
