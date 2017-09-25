import { combineReducers } from 'redux'

import attendance from './attendanceReducer'
import search from './searchReducer'
import auth from './authReducer'
export default combineReducers({
    attendance,
    auth,
    search,
})
