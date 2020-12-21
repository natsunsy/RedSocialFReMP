import React, { Component } from "react";

export default class Login extends Component {
    constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remember:false
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
    const response = await fetch("/sign-in",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
  }

  handleCheck() {
    this.setState({
      remember: !this.state.remember
    });
  }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Iniciar Sesión</h3>

                <div className="form-group">
                    <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Correo electrónico" required/>
                </div>

                <div className="form-group">
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Contraseña" required/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"  value={this.state.remember}
                                onChange={this.handleCheck} />
                        <label className="custom-control-label" htmlFor="customCheck1">Recordarme</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
                <p className="forgot-password text-center">
                 <a href="#">¿Olvidaste tu contraseña?</a>
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
            </form>
        );
    }
}