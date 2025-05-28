import React from 'react'
import { Link,useRouteLoaderData,redirect } from 'react-router-dom'
import EventItem from '../components/EventItem';
import { getToken } from '../../../../01-starting-project/frontend/src/util/auth';

function EventDetail() {
   const eventDetail = useRouteLoaderData("event-detail");
  return (
    <>
        <EventItem event={eventDetail.event}/>
        <Link to=".." relative='path'>Back</Link>
    </>
  )
}

export default EventDetail

export async function eventDetilLoader({params}) {
    const {eventId} = params;
    const response = await fetch(`http://localhost:8080/events/`+eventId);
    if(!response.ok){
      throw new Response(JSON.stringify({message : "Could not fetch events"}),{status:500})
      // return json({message : "Could not fetch events"},{status:500})
    }else
      return response;
}

export async function deleteEventAction({request,params}) {
  const response = await fetch(`http://localhost:8080/events/`+params.eventId,{
    method:request.method,
    headers:{
      "Authorization" : "Bearer " + getToken()
    }
  });
  if(!response.ok){
    throw new Response(JSON.stringify({message : "Could not delete events"}),{status:500})
    // return json({message : "Could not fetch events"},{status:500})
  }else{
    return redirect("/events");
  }
}