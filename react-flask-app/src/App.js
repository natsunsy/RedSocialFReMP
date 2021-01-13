import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import SignUp from "./components/signup.component";
import RecoverPassword from "./components/recover_password.component";
import Photo from "./components/photo.component";
import Login from './components/login.component';
import Muro from './components/muro.component';

export default class App extends Component {
  render(){
    return (<Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/recover" component={RecoverPassword} />
              <Route path="/photo" component={Photo}/>
              <Route path="/inicio" component={Muro}/>
            </Switch>
          </div>
        </div>
      </div></Router>
    );
  }
}