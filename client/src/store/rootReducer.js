import { combineReducers } from 'redux'

// import reducers
import AuthReducer from './Auth'
import BattleReducer from './Battle'

export const rootReducer = combineReducers({
  auth: AuthReducer,
  battle: BattleReducer,
})