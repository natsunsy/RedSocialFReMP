import React, { Component } from "react";
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          lastname: "",
          email:"",
          password:"",
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
        const new_user = {name:this.state.name, lastname:this.state.lastname, email:this.state.email, password:this.state.password};
        const response = await fetch("/sign-up",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_user)
        }).then(res => res.json())
        .then(data => {
            this.setState({
                name: "",
                lastname: "",
                email:"",
                password:"",
            })
            if(data){
                this.setState({success:true,
                                message:data.message,
                                classStyle:data.classStyle})
            }
        })
      }

    render() {
        return (
            <AvForm onValidSubmit={this.handleSubmit}>
                <h3>Registrarte</h3>

                <AvGroup>
                    <AvInput type="text" name="name" value={this.state.name} onChange={this.handleInputChange} className="form-control" placeholder="Nombre" required/>
                    <AvFeedback>Ingrese su nombre.</AvFeedback>
                </AvGroup>

                <AvGroup>
                    <AvInput type="text" name="lastname" value={this.state.lastname} onChange={this.handleInputChange} className="form-control" placeholder="Apellidos" required/>
                    <AvFeedback>Ingrese sus apellidos.</AvFeedback>
                </AvGroup>

                <AvGroup>
                    <AvInput type="email" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Correo electrónico" required/>
                    <AvFeedback>Necesita un correo válido para registrarse.</AvFeedback>
                </AvGroup>

                <AvGroup>
                    <AvInput type="password" name="password" value={this.state.password} onChange={this.handleInputChange} minLength="6" className="form-control" placeholder="Ingrese una contraseña" required/>
                    <AvFeedback>La contraseña debe tener un mínimo de seis caracteres.</AvFeedback>               
                </AvGroup>

                <button type="submit" className="btn btn-primary btn-block">Registrarte</button>
                <p className="forgot-password text-right">
                    Ya estoy registrado <a href="/">¿iniciar sesión?</a>
                </p>
                {this.state.success && <div name="success" className={this.state.classStyle} role="alert">
                    {this.state.message}
                </div>}
            </AvForm>
        );
    }
}