/* src/store/Auth/index.js */

import { dispatch } from 'thunk'

// Auth Types
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
const SIGNUP_LOADING = 'SIGNUP_LOADING'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_LOADING = 'LOGIN_LOADING'

const LOGOUT = 'LOGOUT'

const loginError = (err) => ({
  type: LOGIN_FAILURE,
  err
})
const signupError = (err) => ({
  type: SIGNUP_FAILURE,
  err
})

// Auth Action Creators
export const login = (dispatch) => (username, password) => {
  console.log('tried to login with username:', username, 'and password:', password)

  dispatch({ type: LOGIN_LOADING })

  // run api call, etc., to validate login
  fetch(baseURL + '/login', {
    method : 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'user=' + user.toString() + '&' + 'pass=' + pass.toString()
  })
    .then( res => res.json())
    .then(json => {
      dispatch({ type: LOGIN_SUCCESS })
    })
    .catch(err => dispatch({ type: LOGIN_FAILURE, err }))
}

export const signup = (dispatch) => (username, password) => {
  console.log('tried to sign up with username:', username, 'and password:', password)

  dispatch({ type: SIGNUP_LOADING })

  // run api call, etc., to validate login
  fetch(baseURL + '/signup', {
    method : 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'user=' + username.toString() + '&' + 'pass=' + password.toString()
})
    .then( res => res.json())
    .then(json => {
      console.log('json response:', json.stringify())
      dispatch({ type: SIGNUP_SUCCESS })
    })
    .catch(err => {
        console.log('error:', err)
        dispatch({ type: SIGNUP_FAILURE, err })
    })
}

export const logout = () => {
  dispatch({ type: LOGOUT })
}


// Auth Reducer
const initialState = {
  signedIn: false,
  loading: false,
  errors: null
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    case SIGNUP_LOADING || LOGIN_LOADING:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        signedIn: true,
        loading: false,
        errors: null
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.err
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signedIn: true,
        loading: false,
        errors: null
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.err
      }
    case LOGOUT:
      return {
        ...state,
        loading: false,
        signedIn: false
      }
    default:
      return state;
  }
}