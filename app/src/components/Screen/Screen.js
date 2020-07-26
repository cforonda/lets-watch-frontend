import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import YTPlayer from '../YTPlayer/';
import Form from '../Form/';
import Typography from '@material-ui/core/Typography';

import '../../assets/Screen/Screen.css';

const dotenv = require('dotenv').config();

export default function Screen( { routerProps }) {
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://lets-watch-backend.herokuapp.com/";

    const [numClients, setNumClients] = useState();
    const [videoId, setVideoId] = useState("");

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

    const youtubeVideoCallback = (response) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        setVideoId(response.match(regExp)[7]);
    };

    return (
        <div className='screen'>
            {numClients ? <Typography variant="h6">{numClients} users are currently watching</Typography> 
            :
            <Typography variant="h6">1 user is currently watching</Typography>}

            <br />
            <Form callback={youtubeVideoCallback} />
            <br />
            
            {
                videoId ? <YTPlayer id={videoId} />
                :
                null
            }
        </div>
    )
}