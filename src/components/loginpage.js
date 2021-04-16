import { TextField, Button } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { IS_LOGGED, SET_USER } from '../actions/actions'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [show, setShow] = useState({
    check: false,
    msg: '',
  })
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user.username === '' || user.password === '') {
      setShow({ ...show, check: true, msg: 'Please fill all values' })
    } else {
      axios
        .post('https://loginsystemapp.herokuapp.com/user/validate', user)
        .then((res) => {
          if (res.data.value < 300) {
            dispatch({ type: IS_LOGGED })
            dispatch({ type: SET_USER, payLoad: { name: user.username } })
            history.push('/welcome')
          } else {
            setShow({
              ...show,
              check: true,
              msg: 'Invalid username or password',
            })
          }
        })
        .catch((err) => setShow(true))
    }
  }

  return (
    <div className='box'>
      <h1 style={{ color: '#3f51b5', textAlign: 'center' }}>Login</h1>
      <br></br>
      {show && (
        <>
          <Erromsg message={show.msg} />
          <br></br>
        </>
      )}
      <div className='loginpage'>
        <form onSubmit={{ handleSubmit }}>
          <TextField
            id='standard-basic'
            label='Username'
            style={{ width: '300px' }}
            color='secondary'
            name='username'
            value={user.username}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <br></br>
          <TextField
            id='standard-basic'
            label='Password'
            style={{ width: '300px' }}
            name='password'
            value={user.password}
            type='password'
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <br></br>
          <Button variant='contained' color='primary' onClick={handleSubmit}>
            Login
          </Button>
          <br></br>
          <br></br>
          <br></br>
        </form>
        <div style={{ textAlign: 'left' }}>
          <span style={{ color: '#005edd', cursor: 'pointer' }}>
            Forgot Password?
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to='/register' style={{ textDecoration: 'none' }}>
            <span
              style={{
                color: '#005edd',
                cursor: 'pointer',
              }}
            >
              Create An Account
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

const Erromsg = (props) => {
  return (
    <div style={{ color: 'red', textAlign: 'center' }}>{props.message}</div>
  )
}

export default Login
