import logo from './logo.svg'
import './App.css'
import Login from './components/loginpage'
import Register from './components/register'
import Welcome from './components/welcomepage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {
  const isLogged = useSelector((state) => state.isLogged)
  const history = useHistory()

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/welcome'>{isLogged ? <Welcome /> : <Login />}</Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
