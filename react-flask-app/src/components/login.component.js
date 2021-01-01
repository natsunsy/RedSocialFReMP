import React, { Component } from "react";
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

export default class Login extends Component {
    constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      success:false,
      message:"",
      classStyle:""
    };

  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  handleSubmit = async event => {
    event.preventDefault();
    const user = {email:this.state.email, password:this.state.password};
    const response = await fetch("/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
        withCredentials: "include"
    }).then(res => res.json())
    .then(data => {
        if(data.loggedIn){
            this.props.handleSuccessfulAuth(data);
        }
        else{
            this.setState({ success:true,
                            message:data.message,
                            classStyle:data.classStyle})
        }
    })
  }
  
  render() {
        return (
          <AvForm onValidSubmit={this.handleSubmit}>
                <h3>Iniciar Sesión</h3>
               <AvGroup>
                    <AvInput type="email" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Correo electrónico" required/>
                    <AvFeedback>Se necesita ingresar una dirección de correo válida para iniciar sesión.</AvFeedback>
                </AvGroup>

                <AvGroup>
                    <AvInput type="password" name="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Contraseña" required/>
                    <AvFeedback>Porfavor ingrese una contraseña.</AvFeedback>
                </AvGroup>

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
                {this.state.success && <div name="success" className={this.state.classStyle} role="alert">
                    {this.state.message}
                </div>}
            </AvForm>
        );
    }
}