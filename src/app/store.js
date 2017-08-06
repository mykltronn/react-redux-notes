// store.js file holds the store.
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
// import reducers
import mathReducer from './reducers/mathReducer.js';
import userReducer from './reducers/userReducer.js';

export default createStore(
    combineReducers({
        mathReducer,
        userReducer
    }),
    {},
    applyMiddleware(createLogger(), thunk, promise())
);

/*
SEE HERE: import redux-thunk middleware for asynchronous methods in React/Redux apps. Lines 4 and 15. See also userActions.js in actions for how to impliment thunk on a asynchronous action
OR APPARENTLY: for asynchronous methods/actions that return a promise, use redux-promise-middleware
*/
