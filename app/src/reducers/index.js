import { combineReducers } from 'redux'

import user from './userReducer'
import search from './searchReducer'
import auth from './authReducer'
export default combineReducers({
    user,
    auth,
    search,
})
