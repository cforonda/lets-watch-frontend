import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import YTPlayer from '../YTPlayer/YTPlayer';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
            console.log(data.message);
            setNumClients(data.numClients);
        })

        socket.on('user-joined-room', response => {
            console.log(response.message);
        });

        socket.on('user-joined-room-failed', response => {
            console.log(response.message);
        });
        
    }, []);

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

            <TextField id="standard-basic" type="text" value={videoId} label="Youtube Video Id" onChange={getVideoId} required />
            
            <br />

            <br />
            {
                videoId ? <YTPlayer id={videoId} />
                :
                null
            }

            <button value='Get Nickname' onClick={handleGetNickname}>
                Get Nickname
            </button>
            <button value='Get Room Name' onClick={handleGetRoomName}>
                Get Room Name
            </button>
        </div>
    )
}