import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import YTPlayer from '../YTPlayer/';
import Form from '../Form/';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../../assets/Screen/Screen.css';
import {useSocket} from '../../hooks/useSocket';

const dotenv = require('dotenv').config();

export default function Screen( { routerProps }) {

    const [numClients, setNumClients] = useState();
    const [videoId, setVideoId] = useState("");

    const updateVideoId = text => setVideoId(text);
    const getVideoId = (event) => updateVideoId(event.target.value);
    const { socket, socketRoom, updateSocketRoom, socketNickname,
        updateSocketNickname } = useSocket();

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
        setVideoId(response.match(regExp)[7]);
    };
    
    const handleGetNickname = () => {
        console.log(`Hello ${socketNickname}!`);
    }

    const handleGetRoomName = () => {
        console.log(`Hello ${socketNickname}, you are currently in room: ${socketRoom}`);
    }

    return (
        <div className='screen'>
            {numClients ? <Typography variant="h6">{numClients} users are currently watching</Typography> 
            :
            <Typography variant="h6">1 user is currently watching</Typography>}

            <br />
            <Form callback={youtubeVideoCallback} />
            <br />
            
            <Button variant="contained"
                    value='Get Nickname' 
                    onClick={handleGetNickname}>
                Get Nickname
            </Button>
            <Button variant="contained"
                    value='Get Room Name' 
                    onClick={handleGetRoomName}>
                Get Room Name
            </Button>

            <br /><br />

            {
                videoId ? <YTPlayer id={videoId} />
                :
                null
            }
        </div>
    )
}