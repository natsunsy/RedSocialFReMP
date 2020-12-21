import React, { Component } from "react";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          lastname: "",
          email:"",
          password:"",
          success:false
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
        const response = await fetch("/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_user)
        })
        .then(message => {
            
            this.setState({
                name: "",
                lastname: "",
                email:"",
                password:"",
            })
            if(message.ok){
                console.log(message)
                this.setState({success:true})
            }
        })
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Registrarte</h3>

                <div className="form-group">
                    <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} className="form-control" placeholder="Nombres" required/>
                </div>

                <div className="form-group">
                    <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleInputChange} className="form-control" placeholder="Apellidos" required/>
                </div>

                <div className="form-group">
                    <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Correo electrónico" required/>
                </div>

                <div className="form-group">
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Ingrese una contraseña" required/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Registrarte</button>
                <p className="forgot-password text-right">
                    Ya estoy registrado <a href="/">¿iniciar sesión?</a>
                </p>
                {this.state.success && <div name="success" className="alert alert-success" role="alert">
                    ¡Te has registrado con éxito! 
                </div>}
            </form>
        );
    }
}