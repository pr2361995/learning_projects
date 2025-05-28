import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import EventForm from '../components/EventForm';

function EventEdit() {
    const data = useRouteLoaderData("event-detail");

    return (
        <>
            <h1>EventEdit : {data.event?.id}</h1>
            <EventForm event={data.event} method={"PATCH"}/>
        </>
    )
}

export default EventEdit