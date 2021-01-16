import React, { Component } from "react";
import MessageSender from "../elements/messagesender";
import Navbar from '../elements/navbar';
import './muro.css'
export default class Muro extends Component{
    render(){
        return(
            <div>
                <Navbar title="Inicio"/>
                <div className="feed">
                    <MessageSender/>
                </div>
            </div>
        )
    }
}