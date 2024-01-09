import { SET_USER_DATA, CLEAR_USER_DATA } from '../actions/userActions'

const initialState = {
  userData: null,
}

const userReducer = (state = initialState, action :any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, userData: action.payload }
    case CLEAR_USER_DATA:
      return { ...state, userData: null }
    default:
      return state;
  }
}

export default userReducer
