import {useLoaderData, Await} from "react-router-dom"
import EventsList from '../components/EventsList';
import { Suspense } from "react";

function EventsPage() {
  const {events} = useLoaderData();
  return (
    <Suspense fallback={<p style={{alignItems:"center"}}>Loading...!</p>}>
      <Await resolve={events}>
        {
          (fetchedEvents) => {
            return <EventsList events={fetchedEvents.events} />
          } 
        }
      </Await>
    </Suspense>
    // here can add multiple suspense componet and inside await component will work
  );
}

export default EventsPage;

async function getEvents() {
  const response = await fetch('http://localhost:8080/events',{headers:{
    "Content-Type" : "application/json"
  }});
  if(!response.ok){
    throw new Response(JSON.stringify({message : "Could not fetch events"}),{status:500})
    // return json({message : "Could not fetch events"},{status:500})
  }else
    return response.json();
}

export function eventLoader(){
  return {
    events : getEvents()
    // here we can add multiple fields, each field call function get data from api or localstorage
  }
}


