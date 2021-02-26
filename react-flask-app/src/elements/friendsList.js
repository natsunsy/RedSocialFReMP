import React, {useEffect, useState } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import { makeStyles, Paper, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        margin: theme.spacing(2),
      },
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
  }));

const FriendsList = (props) => {
    const classes = useStyles();
    
    return(
        <Grid item xs={3} className={classes.borderRight500}>
            <Grid item xs={12} style={{padding: '10px'}}>
                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
            </Grid>
            <Divider />
            {props.friends && (
            <List>
                {props.friends.map((friend) => 
                
                <Link to={`/chat/${friend.room}/${friend._id}`}>
                    <ListItem button="true" key={friend._id}> 
                    <ListItemIcon>
                        {friend.imageUrl ? <Avatar alt={friend.name} src={friend.imageUrl} />
                        : <Avatar alt={friend.name} src="" />
                        }
                    </ListItemIcon>
                    <ListItemText primary={friend.name}>{friend.name}</ListItemText>
                    <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                </Link>
                )}
            </List>
            )}   
        </Grid>
    )
}
export default FriendsList;