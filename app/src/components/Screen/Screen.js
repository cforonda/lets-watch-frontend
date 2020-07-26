import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import YTPlayer from '../YTPlayer/YTPlayer';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import '../../assets/Screen/Screen.css';

const dotenv = require('dotenv').config();

export default function Screen( { routerProps }) {
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://lets-watch-backend.herokuapp.com/";

    const [numClients, setNumClients] = useState();
    const [videoId, setVideoId] = useState("");

    const updateVideoId = text => setVideoId(text);
    const getVideoId = (event) => updateVideoId(event.target.value);

    console.log(API_ENDPOINT);

    useEffect(() => {
        const socket = socketIOClient(API_ENDPOINT);

        setInterval(() => {
            socket.emit('getNumClients');
        }, 500);

        socket.on('updateClients', data => {
            console.log(data.message);
            setNumClients(data.numClients);
        })
        
    }, []);

    return (
        <div className='screen'>
            {numClients ? <Typography variant="h6">{numClients} users are currently watching</Typography> 
            :
            <Typography variant="h6">1 user is currently watching</Typography>}
            <br />

            <TextField id="standard-basic" type="text" value={videoId} label="Youtube Video Id" onChange={getVideoId} required />
            
            <br />

            <br />
            {
                videoId ? <YTPlayer id={videoId} />
                :
                null
            }
        </div>
    )
}