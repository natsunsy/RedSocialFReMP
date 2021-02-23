import React, {useEffect, useState, } from 'react';
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../elements/navbar";
import { makeStyles, Paper, Typography, Input, Button, Container } from '@material-ui/core';
import io from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        margin: theme.spacing(2),
      },
    },
    Muicontainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        height: '500px',
        padding: '1rem',
        margin: '80px 250px',
      },
    Muipaper: {
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
    },
    Muipaper2: {
        display: 'flex',
        flexDirection: 'column',
        padding: '2px',
        width: 'auto',
      },
    Data: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    Tittle: {
      width: '300px',
    },
    table: {
      minWidth: 650,
    },
    MuiTable: {
      width: '97%',
    },
  }));

let socket;

const Chat = () => {
    
    const [messages, setMessages] = useState(null);
    const [oldmessages, setOldMessages] = useState(null);
    const [message, setMessage] = useState('');
    const classes = useStyles();
    const history = useHistory();
    const sessionStr = localStorage.getItem("session")
    const sessionJson = JSON.parse(sessionStr)
    const ENDPOINT = 'localhost:5000';
    const userId = sessionJson.user._id
    const {roomId, friendId} = useParams();
    let loggedIn
        if(sessionStr == null)
            loggedIn = false
        else
            loggedIn = sessionJson.loggedIn

    const getMessages = async() => {
        fetch(`/messages/${roomId}/`,{method:'GET'}).then(res=>res.json())
        .then((data) => {
            setMessages(data.messages);
        })
    }

    useEffect(() => {
        getMessages();
        console.log(messages);
    },[])

    useEffect(() => {
        socket = io.connect(ENDPOINT); 
        socket.emit('join_room', { userId , roomId });
        console.log(socket);

        return () => {
            socket.emit('desconectado');
            socket.off();
        }
    }, [ENDPOINT])

    const sendMessage = (e) => {
        e.preventDefault();
        const data = {
            message: message,
            sender: userId,
            receiver: friendId,
            roomId: roomId,
            createdAt: ""
        }
        console.log(data);
        if(message){
            socket.emit('send_message', data);
        }
    }

    useEffect(() => {
        socket.on('receive_message', (message) => {
            console.log("mensaje recibido: " + message)
            setMessages([...messages, message])
        })
        console.log("entra al useffect")
    }, [message])

    return (
        !loggedIn ? history.push("/") :
        
        <Container classes={{root: classes.Muicontainer}}>
        {/* PONER NOMBRE DEL USUARIO */}
        <Navbar title="Chat"/>
        {messages && (
            <Paper classes={{ elevation3: classes.Muipaper }} elevation={3}>
                {messages.map((message) => (
                    <Paper classes={{ elevation2: classes.Muipaper2 }} elevation={2}>{message.message}</Paper>
                ))}
            </Paper>
        )}
            <Input value={message} onChange={(e) => {console.log(e.target.value); setMessage(e.target.value)}}/>
            <Button variant="outlined" color="primary" onClick={e => sendMessage(e)}>Enviar</Button>
        </Container>
    );
}
export default Chat;