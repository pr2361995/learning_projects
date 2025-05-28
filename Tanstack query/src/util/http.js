import { QueryClient } from "@tanstack/react-query";

export async function fetchEvents({signal,searchParam}) {
    let url = 'http://localhost:3000/events';

    if(searchParam)
        url += `?search=${searchParam}`

    const response = await fetch(url,{signal});

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    const { events } = await response.json();

    return events;
}

export async function fetchImages({signal}) {
    let url = 'http://localhost:3000/events/images';

    const response = await fetch(url,{signal});

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    const { images } = await response.json();

    return images;
}

export async function customEvent({id,signal,method}) {
    let url = `http://localhost:3000/events/${id}`;

    const response = await fetch(url,{
        signal  ,
        method  ,
        headers : {
            "Content-Type"  : "application/json"
        }
    });

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    const { event } = await response.json();

    return event;
}

export async function updateEvent({eventData,method,id}) {
    let url = `http://localhost:3000/events/${id}`;

    const response = await fetch(url,{
        method  ,
        body    : JSON.stringify(eventData),
        headers : {
            "Content-Type"  : "application/json"
        }
    });

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    const { event } = await response.json();

    return event;
}


export async function createNewEvent({eventData,method}) {
    let url = 'http://localhost:3000/events';

    const response = await fetch(url,{
        method  ,
        body    : JSON.stringify(eventData),
        headers : {
            "Content-Type"  : "application/json"
        }
    });

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    const { event } = await response.json();

    return event;
}

export const queryClient = new QueryClient();
