import React from 'react'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/navigation';

function NewMeetUpPage() {
    const router = useRouter();
    
    async function meetupHandler(data) {
        await fetch("/api/new-meetup",{
            method : "POST",
            body    : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        }).then(()=> router.push("/")).catch((er) => console.log(er))
    }

    return <NewMeetupForm onAddMeetup={meetupHandler}/>
}

export default NewMeetUpPage