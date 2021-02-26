import React, {useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        margin: theme.spacing(2),
      },
    },
    messageArea: {
      height: '70vh',
      overflowY: 'auto'
    }
  }));


const ChatBox = (props) => {
    const classes = useStyles();
    const sessionStr = localStorage.getItem("session")
    const sessionJson = JSON.parse(sessionStr)
    const userId = sessionJson.user._id
    const {roomId, friendId} = useParams();

    return(
        <List className={classes.messageArea}>
            {props.messages.map((message) => (
                message.sender === userId ?
                <ListItem key={message._id}>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="right" primary={message.message}></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText align="right" secondary={message.createdAt}></ListItemText>
                    </Grid>
                </Grid>
                </ListItem>
                :     
                <ListItem key={message._id}>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="left" primary={message.message}></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText align="left" secondary={message.createdAt}></ListItemText>
                    </Grid>
                </Grid>
                </ListItem>
            ))}
        </List>
    )
}
export default ChatBox;