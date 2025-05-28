import React from 'react'
import { useRouteError } from 'react-router-dom'
import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation';

function Error() {
    const error = useRouteError();
    var title = "An error occurred";
    var message = "Something went wrong";

    if(error.status === 500)
        message = JSON.parse(error.data)?.message
    // message = error.data?.message
    
    if(error.status === 404){
        title = "Not founded"
        message = "Could not find resource or page"
    }

    return (
        <>
            <MainNavigation/>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}

export default Error