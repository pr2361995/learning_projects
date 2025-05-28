import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { customEvent, queryClient } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
  const {id} = useParams(),
  navigate = useNavigate(),
  {data,isError,error,isPending}  = useQuery({
    queryKey  : ['event',{id}],
    queryFn   : ({signal}) => customEvent({signal,id,method:"GET"})
  }),
  {mutate} = useMutation({
    mutationFn  : customEvent,
    onSuccess   : () => {
      queryClient.invalidateQueries({
        queryKey : ["events"],
        refetchType : "none"
      })
      navigate(`/events`);
    } 
  })

  function handleRemoveEvent() {
    const controller = new AbortController(),
    { signal } = controller,
    proceed = window.confirm("Are you sure?");
    if(proceed)
      mutate({signal,id,method:"DELETE"})
  }

  let content;

  if(isPending)
    content = <LoadingIndicator/>
  
  if(isError)
    content = <ErrorBlock title={"fetch event failed"} message={error.info?.message}/>
  
  if(data) 
    content = <article id="event-details">
                  <header>
                    <h1>{data.title}</h1>
                    <nav>
                      <button onClick={handleRemoveEvent}>Delete</button>
                      <Link to="edit">Edit</Link>
                    </nav>
                  </header>
                  <div id="event-details-content">
                    <img src={`http://localhost:3000/${data.image}`} alt={data.image} />
                    <div id="event-details-info">
                      <div>
                        <p id="event-details-location">{data.location}</p>
                        <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} @ {data.time}</time>
                      </div>
                      <p id="event-details-description">{data.description}</p>
                    </div>
                  </div>
              </article>

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {
        content
      }
    </>
  );
}
