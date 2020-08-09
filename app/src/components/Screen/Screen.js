import React, { useState, useEffect } from 'react';
import YoutubePlayer from '../YoutubePlayer';
import Form from '../Form/';
import Typography from '@material-ui/core/Typography';

import '../../assets/Screen/Screen.css';
import {useSocket} from '../../hooks/useSocket';


export default function Screen( { routerProps }) {
    // setup hooks
    const [numClients, setNumClients] = useState();
    const [videoId, setVideoId] = useState("");
    const [videoQueue, updateVideoQueue] = useState([]);

    const addVideoToQueue = videoId => {
        socket.emit('add-video-to-server-queue', videoId);
    };

    const { socket } = useSocket();


    useEffect(() => {
        
        if(socket) {
    
            socket.on('update-clients', response => {
                if(response.message) {
                    console.log(response.message);
                }
                setNumClients(response.numClients);
            })

            socket.on('welcome-new-user-to-room', response => {
                console.log(response.message);
            });

            socket.on('user-joined-room', response => {
                console.log(response.message);
            });

            socket.on('user-left-room', response => {
                console.log(response.message);
            })
    
            socket.on('user-joined-room-failed', response => {
                console.log(response.message);
            });

            socket.on('update-client-video', data => {
                setVideoId(data.videoId);
            })
        }
    });

    const youtubeVideoCallback = (response) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

        if(response) {
            try {
                const videoId = response.match(regExp)[7];
                addVideoToQueue(videoId);
            } catch (error) {
                console.log("IMPROPER VIDEO FORMAT");
                // TODO: Handle notifying the sers
            }
        }
    };


    return (
        <div className='screen'>
              {
                videoId ? 
                <YoutubePlayer videoId={videoId} socket={socket} />
                :
                null
            }
            <Typography variant="h6">Paste a video</Typography>
            <Form callback={youtubeVideoCallback} />
            <br />
            { numClients > 1 ? 
                <Typography variant="subtitle1"><b>{numClients} users</b> are currently watching</Typography> 
                :
                <Typography variant="subtitle1"><b>1 user</b> is currently watching</Typography> }
        
            <br /><br />
        </div>
    )
}