import React, {useState} from 'react';
import "./messagesender.css";
import { Avatar } from '@material-ui/core';
export default function MessageSender(){
    const [input,setInput] = useState('')
    const [imageUrl,setImageUrl] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault();

        setInput("")
        setImageUrl("")
    }

    return <div className="messageSender">
        <div className="messageSender__top">
            
            <form>
                <Avatar/>
                <input 
                value={input} 
                onChange={ (e) => setInput(e.target.value)} 
                className="messageSender__input" 
                placeholder={"Comparte algo..."}/>
                <input 
                value={imageUrl}
                onChange={ (e) => setImageUrl(e.target.value)}
                placeholder="URL de la imagen (Opcional)"/>
                <button className="btn float-right" onClick={handleSubmit} type="submit">Publicar</button>
            </form>
        </div>

        <div className="messageSender__bottom">

        </div>
    </div>
}