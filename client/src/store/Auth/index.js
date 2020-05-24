/* src/store/Auth/index.js */

import { apiConfig } from '../../utils/api.config'

// Auth Types
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
const SIGNUP_LOADING = 'SIGNUP_LOADING'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_LOADING = 'LOGIN_LOADING'

const LOGOUT = 'LOGOUT'
const CLEAR_ERRORS = 'CLEAR_ERRORS'

const loginError = (err) => ({
  type: LOGIN_FAILURE,
  err,
})

const signupError = (err) => ({
  type: SIGNUP_FAILURE,
  err,
})

// Auth Action Creators
export const login = (username, password) => (dispatch) => {
  dispatch({ type: LOGIN_LOADING })

  // run api call, to validate login
  fetch(apiConfig.baseURL + '/login', {
    method : 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'user=' + username.toString() + '&' + 'pass=' + password.toString()
  })
    .then(res => {
      console.log('made it to res', res)
      if(res.status < 400)
        return res.json()
      else
        dispatch({ type: SIGNUP_FAILURE, err: `${res.status} error code` })
    })
    .then(data => {
      console.log('username in response:', data.user)
      dispatch({ type: LOGIN_SUCCESS, username: data.user })
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, err: "error logging in from server" })
    })

  // dispatch({ type: LOGIN_SUCCESS })
}

export const signup = (username, password) => (dispatch) => {
  dispatch({ type: SIGNUP_LOADING })

  // run api call, to validate login
  fetch(apiConfig.baseURL + '/signup', {
    method : 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'user=' + username.toString() + '&' + 'pass=' + password.toString()
  })
    .then(res => {
      console.log('made it to res:', res)
      if(res.status < 400)
        dispatch({ type: SIGNUP_SUCCESS })
      else
        dispatch({ type: SIGNUP_FAILURE, err: `${res.status} error code` })
    })
    .catch(err => {
      // console.log('error:', err.stringify())
      dispatch({ type: SIGNUP_FAILURE, err: "error signing up from server" })
    })
}

export const logout = () => ({
  type: LOGOUT
})
export const clearErrors = () => ({
  type: CLEAR_ERRORS
})


// Auth Reducer
const initialState = {
  username: "",
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
        username: action.username,
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
        signedIn: false,
        loading: false,
        errors: null
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null
      }
    default:
      return state;
  }
}