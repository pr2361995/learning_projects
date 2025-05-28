import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { createNewEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

const defaultMessage = "Failed to create event. Please check the input and try again later."

export default function NewEvent() {
  const navigate = useNavigate(),
  { mutate , isPending , isError , error} = useMutation({
    mutationFn  : createNewEvent  ,
    onSuccess   : () => {
      queryClient.invalidateQueries({
        querykey : ["events"] ,
      })
      return navigate("/events");
    }
  })

  function handleSubmit(formData) {
    mutate({eventData: {event : formData},method:"POST"})
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {
          isPending ?
            "Submitting...!"
          :
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Create
              </button>
            </>
        }
      </EventForm>
      {
        isError && <ErrorBlock title="Failed to create event" message={error.info?.message || defaultMessage}/>
      }
    </Modal>
  );
}
