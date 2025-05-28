import React,{useActionState} from "react";
import { handleSubmit } from '../util/validation'

export default function Signup() {

  const [formState,formAction] = useActionState(handleSubmit,{errors:null})

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.data?.email}/>
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.data?.password}/>
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.data?.confirmpassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.data?.firstname}/>
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.data?.lastname}/>
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.data?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            // value="google"
            defaultChecked={formState.data?.acquisition.includes("google")}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            // value="friend"
            defaultChecked={formState.data?.acquisition.includes("friend")}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input 
            type="checkbox" 
            id="other" 
            name="acquisition" 
            // value="other"
            defaultChecked={formState.data?.acquisition.includes("other")}
            />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input 
            type="checkbox" 
            id="terms-and-conditions" 
            name="terms" defaultChecked={formState.data?.terms} />I
          agree to the terms and conditions
        </label>
      </div>
      {
        formState.errors && <ul className="error">
          {formState.errors.map(er => <li key={er}>{er}</li>)}
        </ul>
      }
      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
