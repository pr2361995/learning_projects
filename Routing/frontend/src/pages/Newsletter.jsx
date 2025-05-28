import React from 'react'
import PageContent from '../components/PageContent'
import NewsletterSignup from '../components/NewsletterSignup'

function Newsletter() {
  return (
    <PageContent title={"Join our awesome newsletter"}>
        <NewsletterSignup/>
    </PageContent>
  )
}

export async function signUpAction({request,params}) {
    const data = await request.formData();
    const email = data.get("email");
    console.log("email",email);
    return {message:"Signup successfully...!"}
    // const response = await fetch(`http://localhost:8080/events/`+params.eventId,{
    //     method:request.method
    //   });
    //   if(!response.ok){
    //     throw new Response(JSON.stringify({message : "Could not delete events"}),{status:500})
    //     // return json({message : "Could not fetch events"},{status:500})
    //   }else{
    //     return redirect("/events");
    //   }
}

export default Newsletter