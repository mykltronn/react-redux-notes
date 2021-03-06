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

const initialState = {
    result: 1,
    lastValues: []
}

// state = initialState explained in Academind Redux #4 1:40
// state is initialState if no state is sent to reducer
const reducer = (state = initialState, action) => {
switch (action.type) {
    case "ADD":
        /*
        state = { // state is now a NEW js.object
            result: state.result,
            lastValues: state.lastValues
        };
        ^ ^ that's the semantic way of doing it, but ES6 can use spread operator
        */
        state = {
            ...state, // get everything from state (in this case, result: and lastValues:)
            result: state.result + action.payload,
            lastValues: [...state.lastValues, action.payload] // spread out all the old values, then add new value. This is a good example of pushing in immutable way.
            // in this case, because we're re-writing everything in 'state', we don't need the spread operator. The reducer takes ALL the state. If we WANT THAT STATE BACK, it has to be passed in the switch. That's why the spread operator is neccessary in most cases.
        };
        // state.lastValues.push(action.payload); < < < this is a bad example, it mutates initial state
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


// second argument (state) removed, in this case reducer itself handles initialization of state
const store = createStore(reducer);

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
