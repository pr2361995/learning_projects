import { useActionState, useContext } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";


export function NewOpinion() {
  const {addOpinion} = useContext(OpinionsContext);
  const [formState,formAction,isPending] = useActionState(shareOpinionAction,{errors:null})

  async function shareOpinionAction(prevState,formData){
    const userName = formData.get("userName"),
    title=formData.get("title"),
    body=formData.get("body"),
    errors =[]

    if(title.trim().length < 5)
      errors.push("Title must be at least five characters long.")
    if(body.trim().length < 10 || body.trim().length > 300)
      errors.push("Opinion must be 10 and 300 characters long.")
    if(!userName.trim())
      errors.push("Please provide the user name")

    if(errors.length > 0)
      return ({errors,data:{title,body,userName}})
    
    await addOpinion({title,body,userName})

    return {errors:null}
  }
  
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.data?.userName}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.data?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.data?.body}></textarea>
        </p>

        {
          formState.errors && <ul className="errors">
            {
              formState.errors.map(er => <li key={er}>{er}</li>)
            }
          </ul>
        }

        <Submit/>
      </form>
    </div>
  );
}
