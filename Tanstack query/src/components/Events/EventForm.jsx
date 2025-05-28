import { useState } from 'react';

import ImagePicker from '../ImagePicker.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchImages } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EventForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image),
  {data,isError,error,isPending} = useQuery({
    queryKey  : ["images"] ,
    queryFn   : fetchImages ,
    // staleTime : 10000,
  });

  console.log("eventform",data,inputData);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const eventDetail = Object.fromEntries(formData);

    onSubmit({ ...eventDetail, image: selectedImage });
  }

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ''}
        />
      </p>

      {
        isError && <ErrorBlock title={"failed to load selected images"} message={error.info?.message} />
      }

      {
        isPending && <LoadingIndicator/>
      }

      {data && <div className="control">
        <ImagePicker
          images={data}
          onSelect={handleSelectImage}
          selectedImage={selectedImage}
        />
      </div>}

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ''}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ''}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ''}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ''}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}
