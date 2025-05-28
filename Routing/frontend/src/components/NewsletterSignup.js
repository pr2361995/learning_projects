import React, { useEffect } from 'react'
import classes from "./NewsletterSignup.module.css"
import { useFetcher } from 'react-router-dom'

function NewsletterSignup() {
    const fetcher = useFetcher(),
    {data,state,Form} = fetcher;
    
    useEffect(()=>{
        if(data && data.message && state === "idle")
            window.alert("Signup Sucessfully")
    },[data,state])

    return (
        <Form method='post' action='/newsletter' className={classes.newsletter}>
            <input 
            type='email'
            placeholder='Signup for newsletter'
            aria-label='Signup for newsletter'/>
            <button>Signup</button>
        </Form>
    )
}

export default NewsletterSignup