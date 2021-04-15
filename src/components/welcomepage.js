import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../actions/actions'

const Welcome = () => {
  const dispatch = useDispatch()
  const uname = useSelector((state) => state.username)
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        Welcome to my Website{' '}
        <span
          style={{
            color: 'red',
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
        >
          ({uname})
        </span>
      </h1>
      <br></br>
      <br></br>
      <button
        style={{
          padding: '10px',
          border: 'none',
          background: 'orange',
          color: 'white',
          fontSize: '18px',
        }}
        onClick={() => dispatch({ type: LOGOUT })}
      >
        logout
      </button>
    </div>
  )
}

export default Welcome
