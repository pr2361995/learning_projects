import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { fetchEvents } from '../../util/http';
import ErrorBlock from '../UI/ErrorBlock';
import LoadingIndicator from '../UI/LoadingIndicator';
import EventItem from './EventItem';

export default function FindEventSection() {
  const searchElement             = useRef(),
  [searchParam,setSearchParam]    = useState(),
  {data,isError,error,isLoading}  = useQuery({
    queryKey : ['events',{search:searchParam}],
    queryFn  : ({signal}) => fetchEvents({signal,searchParam}),
    enabled  : searchParam !== undefined
  })

  function handleSubmit(event) {
    event.preventDefault();
    setSearchParam(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events.</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button disabled={isLoading}>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
