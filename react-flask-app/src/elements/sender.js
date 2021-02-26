import React, {useEffect, useState, useCallback } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import Navbar from "../elements/navbar";
import { makeStyles, Paper, Container } from '@material-ui/core';
import io from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

const Sender = (props) => {

    return(
        <Grid container style={{padding: '20px'}}>
            <Grid item xs={11}>
                <TextField id="outlined-basic-email" label="Type Something" fullWidth value={props.message} onChange={(e) => {props.setMessage(e.target.value)}}/>
            </Grid>
            <Grid xs={1} align="right">
                <Fab color="primary" aria-label="add" onClick={e => props.sendMessage(e)}><SendIcon /></Fab>
            </Grid>
        </Grid>
    )
} 

export default Sender;