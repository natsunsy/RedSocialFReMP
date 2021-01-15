import React, { Component } from "react";
import Navbar from '../elements/navbar';
export default class Diario extends Component{
    render(){
        return(
            <div>
                <Navbar title="Diario"/>
                <h3>Entraste a tu Diario!</h3>
            </div>
        )
    }
}