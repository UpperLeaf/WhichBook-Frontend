import React, { Component } from 'react';
import { Home, Login, Signup } from '../pages';
import { Route } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/signup" component={Signup}></Route>
            </div>
        );
    }
}

export default App;
