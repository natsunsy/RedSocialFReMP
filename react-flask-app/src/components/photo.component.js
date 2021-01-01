import React, { Component } from "react";

export default class Photo extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <h1>Ingresaste correctamente</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
            </div>
        )
    }
}