import React from 'react'
import EventForm from '../components/EventForm'
import { redirect } from 'react-router-dom';
import { getToken } from '../../../../01-starting-project/frontend/src/util/auth';

function EventNew() {
  return (
    <div>
        <EventForm method={"POST"}/>
    </div>
  )
}

export async function eventAddAction({request,params}){
    const data = await request.formData();
    const eventData = {
        title : data.get("title"),
        image : data.get("image"),
        date : data.get("date"),
        description : data.get("description"),
    }
    var url = `http://localhost:8080/events/`;
    const response = await fetch(request.method === "PATCH" ? url+params.eventId : url,{
        method:request.method,
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + getToken()
        },
        body: JSON.stringify(eventData)
    });
    
    if(response.status === 422){
      return response;
    }

    if(!response.ok){
      throw new Response(JSON.stringify({message : "Could not fetch events"}),{status:500})
      // return json({message : "Could not fetch events"},{status:500})
    }else
      return redirect("/events");
}

export default EventNew