import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { Login, Signup } from './login/index';
import Dashboard from './dashboard';

class Index extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/dashboard" component={Dashboard}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Index;
