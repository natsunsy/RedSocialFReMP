import React, {useState} from 'react';
import "./messagesender.css";
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
    avatar: {
        margin:"2%",
        [theme.breakpoints.down("sm")]:{
            /*position:"fixed",*/
            margin:"3% 3%"}
    },
  }));
export default function MessageSender({handleAddPost}){
    const [input,setInput] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    const sessionStr = localStorage.getItem("session")
    const sessionJson = JSON.parse(sessionStr)
    const user = sessionJson.user
    const classes = useStyles();

    const handleSubmit = (e) =>{
        e.preventDefault();
        handleAddPost({
            userId:user._id,
            username:user.name,
            message:input,
            imageUrl:imageUrl,
            timestamp:new Date()
        })
        setInput("")
        setImageUrl("")
    }

    return <div className="messageSender">
        <div className="messageSender__top">
            
            <form>
                <Avatar className={classes.avatar} src="https://scontent.flim11-1.fna.fbcdn.net/v/t1.0-9/130249199_4085934954754163_3099918067762144354_n.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeHQfj-ySbhveZyUGvRhOKopRs1cdnmMOm9GzVx2eYw6b2-aJ_wuroadDOfGAB7a8Pff-r76GyKzGMExSxFU20jR&_nc_ohc=MXzxM-zn6IAAX8-bXQn&_nc_ht=scontent.flim11-1.fna&oh=1f9a0965813770f603b008be42eeb9ba&oe=602CCDBE"/>
                <input 
                value={input} 
                onChange={ (e) => setInput(e.target.value)} 
                className="messageSender__input" 
                placeholder={"Comparte algo..."}/>
                <input 
                value={imageUrl}
                onChange={ (e) => setImageUrl(e.target.value)}
                placeholder="URL de la imagen (Opcional)"/>
                <button className="btn float-right" onClick={handleSubmit} type="submit" disabled={input ? "" : "disabled"}>Publicar</button>
            </form>
        </div>

        <div className="messageSender__bottom">

        </div>
    </div>
}