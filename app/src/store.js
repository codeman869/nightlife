import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

import reducer from './reducers'

let middleware
if(process.env.NODE_ENV != 'production') {
    middleware = applyMiddleware(promiseMiddleware(), thunk, logger);
} else {
    
    middleware = applyMiddleware(promiseMiddleware(), thunk);
}


export default createStore(reducer, middleware)