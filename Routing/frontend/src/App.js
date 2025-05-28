// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - EventNew
//    - EventEdit
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => EventNew
//    - /events/<some-id>/edit => EventEdit
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventPage,{eventLoader} from './pages/Events';
import EventDetail,{eventDetilLoader,deleteEventAction} from './pages/EventDetail';
import EventNew,{eventAddAction} from './pages/EventNew';
import EventEdit from './pages/EventEdit';
import Root from './pages/Root';
import EventRoot from './pages/EventRoot';
import Error from './pages/Error';
import Newsletter, { signUpAction } from './pages/Newsletter';

const router = createBrowserRouter([
  {
    path        : "/",
    element     : <Root/>,
    errorElement: <Error/>,
    children : [
      {
        index   : true,
        element : <HomePage/>,
      },
      {
        path      : "events",
        element   : <EventRoot/>,
        children  : [
          {
            index   : true,
            element : <EventPage/>,
            loader  : eventLoader
          },
          {
            path      : ":eventId",
            id        : "event-detail",
            loader    : eventDetilLoader,
            children  : [
              {
                index:true,
                element : <EventDetail/>,
                action  : deleteEventAction
              },
              {
                path    : "edit",
                element : <EventEdit/>,
                action  : eventAddAction
              }
            ]
          },
          {
            path    : "new",
            element : <EventNew/>,
            action  : eventAddAction
          },
        ]
      },
      {
        path    : "newsletter",
        element : <Newsletter/>,
        action  : signUpAction
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
