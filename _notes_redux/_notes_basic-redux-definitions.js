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

import { createStore } from 'redux';

// "reducer" takes actions dispathced in applicaiton and does something with them
// reducer arguments are passed automatically by redux
// one reducer typically handles multiple actions

const reducer = (state, action) => {
// determine which action occured
switch (action.type) {
    case "ADD":
        state = state + action.payload;
        break;
    case "SUBTRACT":
        state = state - action.payload;
        break;

    }
    // reducers always have to return state
    return state;
}
// createStore takes two arguments:
// ([reducer(s)], [initial application state: an object, an array, whatevs])
// reducer will give new state
const store = createStore(reducer, 1);

// ** not useful in react, just debugging your redux **
store.subscribe(() => {
    console.log("Store updated!", store.getState());
})


// dispatching actions
store.dispatch({ // hey store, here's a new action. Expects a js.object
    type: "ADD", // when ADD is triggered,
    payload: 10    // this is the value, or payload. Think of it as the argument for the type. That argument is passed on to the REDUCER which contains a series of methods, including "ADD" which is "passed the argument" as action.payload
})

store.dispatch({
    type: "SUBTRACT",
    payload: 80
})

/*
So. There's a flow here.

the REDUCER takes in current state and an action
it then does that action to current state.

or maybe it's more accurate to say that the REDUCER, when passed STATE and an ACTION(dispatch), contains a blueprint for a statechange.
that blueprint is then passed to the STORE.

the STORE is what actually passes the current state to the REDUCER. STOREs take as arguments the REDUCER(s) used and the current state in some form.
*/
