import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { createNewEvent, customEvent, queryClient, updateEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EditEvent() {
  const navigate = useNavigate(),
  {id} = useParams(),
  {data,isError,error,isPending} = useQuery({
    queryKey  : ["event",{id}],
    queryFn   : ({signal}) => customEvent({signal,id,method:"GET"})
  }),
  {mutate,isPending:isDisabled,isError:isUpdateError,error:updateError} = useMutation({
    mutationFn : updateEvent,
    onMutate : async (newdata) => {
      await queryClient.cancelQueries({queryKey : ["event",{id}]}); // cancel the all active query relavant to id
      // these ongoing quries finished. we would have fetched old data again.
      const previousEvent = queryClient.getQueryData(["event",{id}]); // get the previous data before updating the new data
      queryClient.setQueriesData(["event",{id}],{...previousEvent,...newdata.eventData.event}); // set new data relavant to id in the cache
      return { previousEvent }; // pass to the onError function
    },
    onError   : (err,newEvent,context) => {
      queryClient.setQueriesData(["event",{id}],context.previousEvent);
    },
    onSettled  : () => {
      queryClient.invalidateQueries(["event",{id}]);
    },
    onSuccess  : () => {
      navigate(`../`);
    }
  })

  function handleSubmit(formData) {
    mutate({eventData:{event:formData},method:"put",id})
    // mutate call trigger the onMutate function also , onMutate function recevied data passed from here
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if(isPending)
    content = <LoadingIndicator/>

  if(isError)
    content = <ErrorBlock title={"fetch event failed"} message={error.info?.message}/>

  if(data) 
    content = <EventForm inputData={data} onSubmit={handleSubmit}>
                {
                  isUpdateError && <ErrorBlock title={"event details updating failed"} message={updateError.info?.message}/>
                }
                {
                  isDisabled ? 
                    "Submitting...!"
                  :
                    <>
                      <Link to="../" className="button-text">
                        Cancel
                      </Link>
                      <button type="submit" className="button">
                        Update
                      </button>
                    </>
                }
              </EventForm>

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
