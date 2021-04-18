import { TextField, Button } from '@material-ui/core'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Register = () => {
  let history = useHistory()
  const [show, setShow] = useState({
    check: false,
    msg: '',
  })
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPass: '',
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      user.username === '' ||
      user.email === '' ||
      user.password === '' ||
      user.confirmPass === ''
    ) {
      setShow({ ...show, check: true, msg: 'Please fill all values' })
      return
    }
    if (user.password != user.confirmPass) {
      setShow({ ...show, check: true, msg: 'Password Not Matched' })
    } else {
      axios
        .post('https://loginsystemapp.herokuapp.com/user/save', user)
        .then((res) => history.push('/'))
        .catch((err) => console.log(err))
    }
  }
  return (
    <>
      <h1 style={{ color: '#3f51b5' }}>Register</h1>
      <br></br>
      {show.check && <Erromsg message={show.msg} />}
      <br></br>
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
          <TextField
            id='standard-basic'
            label='Email'
            style={{ width: '300px' }}
            color='secondary'
            name='email'
            type='email'
            value={user.email}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <TextField
            id='standard-basic'
            label='Password'
            style={{ width: '300px' }}
            color='secondary'
            name='password'
            type='password'
            value={user.password}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <TextField
            id='standard-basic'
            label='Confirm Password'
            style={{ width: '300px' }}
            type='password'
            name='confirmPass'
            value={user.confirmPass}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <br></br>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Register
          </Button>
        </form>

        <br></br>
        <br></br>
      </div>
    </>
  )
}

const Erromsg = (props) => {
  return (
    <div style={{ color: 'red', textAlign: 'center' }}>{props.message}</div>
  )
}

export default Register
