import { IS_LOGGED, LOGOUT, SET_USER } from '../actions/actions'

const initialState = {
  username: '',
  isLogged: false,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOGGED:
      return { ...state, isLogged: true }
    case LOGOUT:
      return { ...state, isLogged: false }
    case SET_USER:
      return { ...state, username: action.payLoad.name }
    default:
      return state
  }
}

export default reducer
