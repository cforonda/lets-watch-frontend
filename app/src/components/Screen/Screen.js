import React, { useState, useEffect } from 'react';
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

        console.log('Socket Nickname: ', socketNickname);
        console.log('Socket Room: ', socketRoom);
        
        if(socket) {
            setInterval(() => {
                socket.emit('getNumClients', socketRoom);
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
        }
        
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
            <Typography variant="h6">Paste a video</Typography>
            <Form callback={youtubeVideoCallback} />
            <br />
            { numClients ? 
                <Typography variant="subtitle1"><b>{numClients} users</b> are currently watching</Typography> 
                :
                <Typography variant="subtitle1"><b>1 user</b> is currently watching</Typography> }
            {/* <Button variant="contained"
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
            </Button> */}

            <br /><br />

            {
                videoId ? <YouTubePlayer id={videoId} />
                :
                null
            }
        </div>
    )
}