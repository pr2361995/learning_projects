import { useSelector } from 'react-redux';
import Auth from './components/Auth';
import Counter from './components/Counter';
import Header from './components/Header';
import UserProfile from './components/UserProfile';


function App() {
  const {isAuthenticated} = useSelector(state => state.authentication)
  return (<>
    <Header/>
    {!isAuthenticated && <Auth/>}
    {isAuthenticated && <UserProfile/>}
    <Counter />
  </>
  );
}

export default App;
