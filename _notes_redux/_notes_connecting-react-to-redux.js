// ===================== v v v v index.js file v v v v =====================

import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux';
// import children
import App from './components/App.js';

/*
At this stage, React is running and Redux is running, but react is not CONNECTED to Redux.
*/

// 1. Connect the STORE with React App using Provider
// -- provider "provides" the store to React
// 2. Call Provider in the render method
// -- wrap <App /> in <Provider> </ Provider>
// -- pass provider props to carry the STORE
// 3. Redux needs to know what state each component needs and which actions it will dispatch.
//

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

const myLogger = (store) => (next) => (action) => {
    console.log("Logged Action: ", action);
    next(action);
}

const store = createStore(
    combineReducers({mathReducer, userReducer}),
    {},
    applyMiddleware(myLogger, createLogger())
);

// store.subscribe(() => {
//     console.log("Store updated!", store.getState());
// })

render( // wrap the entire App in Provider. Provider gets passed prop called store that takes const store from line 75.
    <Provider store={store}>
        <App />
    </Provider>,
    window.document.getElementById('app'));


// ===================== v v v v App.js file v v v v =====================

import React from "react";
import User from './User';
import Main from './Main';
import { connect } from 'react-redux'

class App extends React.Component {
    render() {
        return (            // NOTE: this.props.setName replaces the previous method. setName, as defined on line33, dispatches an action. The argument given to setName is passed in as the payload for the dispatch.
            // BONUS NOTE: Because in this case we want to pass an argument to setName, we need to add () to setName. But that would normally execute setName right away. So instead, make changeUsername a fat-arrow function that executes this.props.setName("Anna") when activated
            <div className="container">
                <Main changeUsername={() => this.props.setName("Anna")}/>
                <User username={this.props.user.name}/>
            </div>
        );
    }
} // NOTE: this.props.user refers to the "user" property that is wired up in mapStateToProps on line 25. That itself refers to the userReducer which is an object containting, in this case "name" and "age". So this.props.user.name chains some serious shit
// NOTE: It's good practice to pass global state as a prop to children. You don't want to hook up every component in your application to Redux.



const mapStateToProps = (state) => {
    // "Which properties of the global state do I want to use in this component?"
    // "To which local properties, accessible through ".props" do I want to map that state?"
    return {
        user: state.userReducer,
        math: state.mathReducer
    }
} // ^ ^ so this provides the connect() method with the blueprint it needs to connect react state to redux state

const mapDispatchToProps = (dispatch) => {
    // "Which actions do I want to send to my reducers?"
    return {
        setName: (name) => { // setName is accessibl through this.props.setName
            dispatch({       // setName dispatches an action to the store
                type: "SET_NAME",
                payload: name
            });
        }
    }
}

// connect takes mapState... and mapDispatch.. and returns a function to which we pass (App)
// Don't need to export App to indx.js, export connect which calls App
export default connect(mapStateToProps, mapDispatchToProps)(App);
