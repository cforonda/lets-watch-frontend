import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import YTPlayer from "../YTPlayer/YTPlayer";
import '../../assets/Screen/Screen.css';

const dotenv = require('dotenv').config();


export default function Screen( { routerProps }) {
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://lets-watch-backend.herokuapp.com/";

    const [isFirstConnect, setIsFirstConnect] = useState(true);
    const [numClients, setNumClients] = useState();

    console.log(API_ENDPOINT);

    useEffect(() => {
        const socket = socketIOClient(API_ENDPOINT);

        setInterval(() => {
            socket.emit('getNumClients');
        }, 500);

        socket.on('newclientconnect', data => {
            console.log('new person connected!');
            setNumClients(data.numClients);
         });
        
    }, []);

    return (
        <div className='screen'>
            numClients: {numClients}
            <YTPlayer id="Qll7IHN0I4Q"/>
        </div>
    )
}