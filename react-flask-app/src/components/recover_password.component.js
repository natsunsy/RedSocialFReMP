import React, { Component } from "react";
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

export default class RecoverPassword extends Component {
    constructor(props) {
    super(props);
    this.state = {
      email: "",
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
    const response = await fetch("/recoverpassword",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
  }

  render() {
        return (
          <AvForm onValidSubmit={this.handleSubmit}>
                <h3>Ingrese su correo electrónico para recuperar su contraseña</h3>
               <AvGroup>
                    <AvInput type="email" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Correo electrónico" required/>
                    <AvFeedback>Se necesita ingresar una dirección de correo válida para recuperar su contraseña.</AvFeedback>
                </AvGroup>
                <button type="submit" className="btn btn-primary btn-block">Enviar</button>
                <a type="button" className="btn btn-light btn-block" href="/">Volver</a>
            </AvForm>
            
        );
    }
}