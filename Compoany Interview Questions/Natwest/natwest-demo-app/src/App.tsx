import { Provider } from 'react-redux'
import './App.css'
import CustomersDashboard from './features/dashboard/CustomersDashboard'
import { store } from './app/store'

function App() {

  return (
    <>
    <Provider store={store}>
      <CustomersDashboard/>
    </Provider>
    </>
  )
}

export default App
