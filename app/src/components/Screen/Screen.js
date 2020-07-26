import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import YouTubePlayer from '../YouTubePlayer/';
import Form from '../Form/';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../../assets/Screen/Screen.css';
import {useSocket} from '../../hooks/useSocket';

const dotenv = require('dotenv').config();

export default function Screen( { routerProps }) {
    // setup hooks
    const [numClients, setNumClients] = useState();
    const [videoId, setVideoId] = useState("");

    const updateVideoId = text => setVideoId(text);
    const { socket, socketRoom, updateSocketRoom, socketNickname,
        updateSocketNickname } = useSocket();

    const buttonStyle = {
        "padding": "auto",
        "margin": "10px",
        "height": "50px"
    }

    useEffect(() => {
        
        setInterval(() => {
            socket.emit('getNumClients');
        }, 500);

        socket.on('updateClients', data => {
            if(data.message) {
                console.log(data.message);
            }
            setNumClients(data.numClients);
        })

        socket.on('user-joined-room', response => {
            console.log(response.message);
        });

        socket.on('user-joined-room-failed', response => {
            console.log(response.message);
        });
        
    }, []);

    const youtubeVideoCallback = (response) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

        if(response != "") {
            setVideoId(response.match(regExp)[7]);
        }
    };
    
    const handleGetNickname = () => {
        console.log(`Hello ${socketNickname}!`);
    }

    const handleGetRoomName = () => {
        console.log(`Hello ${socketNickname}, you are currently in room: ${socketRoom}`);
    }

    return (
        <div className='screen'>
            { numClients ? 
                <Typography variant="h6">{numClients} users are currently watching</Typography> 
                :
                <Typography variant="h6">1 user is currently watching</Typography> }

            <br />
            <Form callback={youtubeVideoCallback} />
            <br />
            
            <Button variant="contained"
                    value='Get Nickname'
                    color="primary"
                    style={buttonStyle}
                    onClick={handleGetNickname}>
                <b>Get Nickname</b>
            </Button>

            <Button variant="contained"
                    value='Get Room Name' 
                    color="primary"
                    style={buttonStyle}
                    onClick={handleGetRoomName}>
                <b>Get Room Name</b>
            </Button>

            <br /><br />

            {
                videoId ? <YouTubePlayer id={videoId} />
                :
                null
            }
        </div>
    )
}