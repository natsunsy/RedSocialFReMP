import React, { Component } from "react";
import {Redirect} from "react-router-dom";
const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  
export default class Login extends Component {
    constructor(props) {
    super(props);
    const sessionStr = localStorage.getItem("session")
    let loggedIn=true
    if(sessionStr == null)
        loggedIn = false

    this.state = {
      email: "",
      password: "",
      loggedIn,
      message:"",
      classStyle:"",
      errors:{email:""}
    };

  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let errors = this.state.errors;

    switch (name) {
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Debe ingresar un correo electrónico válido.';
        break;
      default:
        break;
    }

    this.setState({
      errors,[name]: value
    });
  }
  
  handleSubmit = async event => {
    event.preventDefault();
    const user = {email:this.state.email, password:this.state.password};
    await fetch("/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
        withCredentials: "include"
    }).then(res => res.json())
    .then(data => {
        if(data.loggedIn){
            localStorage.setItem("session", JSON.stringify(data))

            this.setState({ 
                loggedIn:data.loggedIn
                            })
        }else{
            this.setState({
                message:data.message,
                classStyle:data.classStyle
            })
        }
    })
  }
  
  render() {
      if(this.state.loggedIn){
          return <Redirect to="/photo"/>
      }
      const {errors} = this.state;
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>
                <h3>Iniciar Sesión</h3>
                <div className="email">
                    <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Correo electrónico" required/>
                    {errors.email.length > 0 && 
                    <span className='error'>{errors.email}</span>}
                </div>
                <div className="password">
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Contraseña" required/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
                <p className="forgot-password text-center">
                 <a href="/recover">¿Olvidaste tu contraseña?</a>
                </p>
                <a type="button" className="btn btn-light btn-block" href="/sign-up">Crear Cuenta Nueva</a>
                
                <hr></hr>

                <div id="gSignInWrapper">
                    <div id="customBtn" className="customGPlusSignIn">
                        <span className="icon"></span>
                        <span className="buttonText">Iniciar Sesión con Google</span>
                    </div>
                </div>
                <div id="name"></div>
                <script>startApp();</script>
                {this.state.loggedIn && <div name="success" className={this.state.classStyle} role="alert">
                    {this.state.message}
                </div>}
            </form>
            </div>
            </div>
        );
    }
}