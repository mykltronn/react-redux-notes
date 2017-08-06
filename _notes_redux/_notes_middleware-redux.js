// import React from "react";
// import {render} from "react-dom";
//
// import { User } from './components/User';
// import { Main } from './components/Main';
//
// class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             username: "Max"
//         };
//     }
//
//     changeUsername(newName) {
//         this.setState({
//             username: newName
//         });
//     }
//
//     render() {
//         return (
//             <div className="container">
//                 <Main changeUsername={this.changeUsername.bind(this)}/>
//                 <User username={this.state.username}/>
//             </div>
//         );
//     }
// }
//
// render(<App />, window.document.getElementById('app'));


// import applyMiddleware from redux package. Allows applying middleware in to redux flow
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'

const mathReducer = (state = {
    result: 1,
    lastValues: []
}, action) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
        case "SUBTRACT":
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            }

            break;

        }
        return state;
}

const userReducer = (state = {
    name: "Mykl",
    age: 32
}, action) => {
    switch (action.type) {
        case "SET_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
        case "SET_AGE":
            state = {
                ...state,
                age: action.payload
            }

            break;

        }
        return state;
}
// to be used as middleware
//            this is boilerplate, redux expects this pattern
const myLogger = (store) => (next) => (action) => {
    console.log("Logged Action: ", action);
    next(action); // if you don't call next, client never moves past middleware
}

// to apply middleware, add it to createStore method.
// -- first argument sets up reducer(s)
// -- second argument is initial state (in this case an empty object which will be overwritten by reducers which have their own initial state)
// -- third argument is applyMiddleware(middleware you want to use)
const store = createStore(
    combineReducers({mathReducer, userReducer}),
    {},
    applyMiddleware(myLogger, createLogger()) // redux-logger is some third-party middleware that logs nice stuff for reference
);

store.subscribe(() => {
    console.log("Store updated!", store.getState());
})


store.dispatch({
    type: "ADD",
    payload: 100
})

store.dispatch({
    type: "ADD",
    payload: 22
})

store.dispatch({
    type: "SUBTRACT",
    payload: 80
})

store.dispatch({
    type: "SET_AGE",
    payload: 30
})
