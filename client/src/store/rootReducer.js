import { combineReducers } from 'redux'

// import reducers
import AuthReducer from './Auth'

export const rootReducer = combineReducers({
  auth: AuthReducer
})