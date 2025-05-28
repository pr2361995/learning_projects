import { Form, useActionData, useNavigate,useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navidation = useNavigation();
  const isSubmiting = navidation.state === "submitting";
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form} >
      {
        data && <ul>{
          data.errors.map(err => <li key={err}>{err}</li>)
        }</ul>
      }
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event?.title}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event?.image}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event?.date}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event?.description}/>
      </p>
      <div className={classes.actions}>
        <button type="button" disabled={isSubmiting} onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmiting}>{isSubmiting ? "Submiting" : "Save"}</button>
      </div>
    </Form>
  );
}

export default EventForm;
