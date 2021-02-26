import React, {useEffect, useState, useCallback } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import Navbar from "../elements/navbar";
import { makeStyles, Paper, Container } from '@material-ui/core';
import io from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FriendsList from '../elements/friendsList';
import ChatBox from '../elements/chatBox';
import Sender from '../elements/sender';

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
        width: '900px',
        padding: '1rem',
        margin: '80px 250px',
      },
    chatSection: {
      width: '100%',
      height: '80vh'
    },
  }));

let socket;

const Chat = () => {
    
    const [messages, setMessages] = useState(null);
    const [friends, setFriends] = useState(null);
    const [friend, setFriend] = useState(null);
    const [message, setMessage] = useState('');
    const classes = useStyles();
    const history = useHistory();
    const ENDPOINT = 'localhost:5000';
    const sessionStr = localStorage.getItem("session")
    const sessionJson = JSON.parse(sessionStr)
    const userId = sessionJson.user._id
    const {roomId, friendId} = useParams();
    const {oldParam, setOldParam} = useState(null);
    let loggedIn
        if(sessionStr == null)
            loggedIn = false
        else
            loggedIn = sessionJson.loggedIn

    const getFriend = async() => {
      fetch(`/users/${friendId}/`,{method:'GET'}).then(res=>res.json())
      .then((data) => {
          setFriend(data.user);
      })
    }

    const getMessages = async() => {
      fetch(`/messages/${roomId}/`,{method:'GET'}).then(res=>res.json())
      .then((data) => {
          setMessages(data.messages);
      })
    }

    const getFriends = async() => {
      console.log(userId);
      fetch(`/users/${userId}/friends/`,{method:'GET'}).then(res=>res.json())
      .then((data) => {
          //console.log(data);
          setFriends(data.users);
      })
    }

    useEffect(() => {
      getFriend();
      console.log(friend);
    },[])

    useEffect(() => {
      getFriends();
      //console.log(friends);
    },[])

    useEffect(() => {
      getMessages();
      //console.log(messages);
    },[])

    useEffect(() => {
        socket = io.connect(ENDPOINT, {
          withCredentials: true,
        });
        
        setInterval(()=>{
          socket.volatile.emit('keep_alive');
          console.log('Keeping alive');
        },30000);

        socket.emit('join_room', { userId , roomId });
        console.log(socket);

        return () => {
            socket.emit('leave_room');
            socket.off();
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        const data = {
            message: message,
            sender: userId,
            receiver: friendId,
            roomId: roomId,
            createdAt: new Date()
        }
        if(message){
            socket.emit('send_message', data);
        }
        setMessage("");
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
          if(messages !== null){
            setMessages([...messages, data]);
          }
        })

        console.log("entra al useffect");
    },[messages])

    useEffect(() => { 
      getMessages();
    }, [roomId])

    return (
      !loggedIn ? history.push("/") :
      
      <Container classes={{ root: classes.Muicontainer }}>
      {/* PONER NOMBRE DEL USUARIO */}
      <Navbar title="Chat"/>
      <div>
        <Grid container component={ Paper } className={ classes.chatSection }>
            <FriendsList friends={ friends }/>
            <Grid item xs={9}>
            {messages && (
              <ChatBox messages={ messages }/>
              )}
            <Divider />
              <Sender message={ message } setMessage={ setMessage } sendMessage={ sendMessage }/>
            </Grid>
        </Grid>
      </div>
      </Container>  
    );
}
export default Chat;