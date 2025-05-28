import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const onSubmit = useSubmit();
  
  useEffect(()=>{
    if(!token)
      return;

    if(token === "EXPIRED"){
      onSubmit(null,{ action : "/logout" , method : "post"})
      return;
    }
    
    const tokenDuration = getTokenDuration()

    setTimeout(()=>{
      onSubmit(null,{ action : "/logout" , method : "post"})
    },tokenDuration)

  },[token,onSubmit])
  
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
