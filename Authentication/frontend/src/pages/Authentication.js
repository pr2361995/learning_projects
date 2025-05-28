import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function authAction({request,params}) {
  const searchParams = new URL(request.url).searchParams,
  mode = searchParams.get("mode") || "login";
  
  if(mode !== "login" && mode !== "signup")
    return new Response(JSON.stringify({message:`Invalid mode : ${mode}`}),{status:422})

  const data = await request.formData(),
  authData = {
    email     : data.get("email"),
    password  : data.get("password")
  };
  const response = await fetch(`http://localhost:8080/${mode}`,
    { 
      method  : "POST",
      headers : {
        "Content-Type" : "application/json"
      } ,
      body    : JSON.stringify(authData)
    }
  );
  if(response.status === 422 || response.status === 401)
    return response;

  if(!response.ok)
    return new Response(JSON.stringify({message:`Unable to ${mode}`}),{status:500})
  else{
    const {token} = await response.json();
    
    localStorage.setItem("token",token)
    const expire = new Date();
    expire.setHours(expire.getHours() + 1);
    localStorage.setItem("expiration",expire.toISOString());
    
    return redirect("/");
  }
}