import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/home.component";
import SignUp from "./components/signup.component";
import RecoverPassword from "./components/recover_password.component";
import Photo from "./components/photo.component";

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    const response = fetch("/",{
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      withCredentials: "include"
      }).then(response => {
          if (
            response.data.loggedIn &&
            this.state.loggedInStatus === "NOT_LOGGED_IN"
          ) {
            this.setState({
              loggedInStatus: "LOGGED_IN",
              user: response.data.user
            });
          } else if (
            !response.data.loggedIn &
            (this.state.loggedInStatus === "LOGGED_IN")
          ) {
            this.setState({
              loggedInStatus: "NOT_LOGGED_IN",
              user: {}
            });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }


  render(){
    return (<Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route 
                exact 
                path='/' 
                render={props=>(
                  <Home
                    {...props}
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )}
                 />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/recover" component={RecoverPassword} />
              <Route 
                exact 
                path='/photo' 
                render={props=>(
                  <Photo
                    {...props}
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )}
                 />
            </Switch>
          </div>
        </div>
      </div></Router>
    );
  }
}