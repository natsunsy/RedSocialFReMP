import React from 'react';
import "./messagesender.css";
import { Avatar } from '@material-ui/core';
export default function MessageSender(){
    const handleSubmit = (e) =>{
        e.preventDefault();
    }
    return <div className="messageSender">
        <div className="messageSender__top">
            <Avatar/>
            <form>
                <input placeholder={"Comparte algo..."}/>
                <input placeholder="URL de la imagen (Opcional)"/>
                <button onClick={handleSubmit} type="submit">Hidden Submit</button>
            </form>
        </div>

        <div className="messageSender__bottom">

        </div>
    </div>
}