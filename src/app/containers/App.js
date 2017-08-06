import React from 'react';
import { User } from '../components/User';
import { Main } from '../components/Main';
import { connect } from 'react-redux'
import { setName } from '../actions/userActions.js'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Main changeUsername={() => this.props.setName("Coco")}/>
                <User username={this.props.user.name}/>
            </div>
        );
    }
} 

// connnect this component to Redux.
const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        math: state.mathReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => { // setName(name) is imported from ../actions/userActions.js
            dispatch(setName(name));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
