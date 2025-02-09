import { Provider } from 'react-redux'
import './App.css'
import Dashboard from './features/dashboard/Dashboard'
import { store } from './app/store/store'

function App() {

  return (
    <>
    <Provider store={store}>
      <Dashboard/>
    </Provider>
    </>
  )
}

export default App
