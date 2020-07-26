import React, { useState, useContext, createContext, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://lets-watch-backend.herokuapp.com/";
const SocketContext = createContext();

/* 
    This function is responsible for providing the socket connection to the client
    and will be uitlized in index.js to ensure re-renders do not cause an infinite
    loop of socket connections.
*/
export default function SocketProvider({ children }) {
    const [socket, setSocket] = useState(socketIOClient(API_ENDPOINT));
    const [socketRoom, setSocketRoom] = useState('community');
    const [socketNickname, setSocketNickname] = useState(uuidv4());

    useEffect(() => {
        socket.emit('update-nickname', socketNickname);
        socket.emit('join-room', socketRoom);
    })

    const updateSocket = socketIOClient => setSocket(socketIOClient);

    const updateSocketRoom = socketRoom => {
        setSocketRoom(socketRoom);
        socket.emit('join-room', socketRoom );
    }

    const updateSocketNickname = socketNickname => {
        setSocketNickname(socketNickname);
        socket.emit('update-nickname', socketNickname );
    }

    console.log(`Socket Connection: ${API_ENDPOINT}`); // 

    return (
        <SocketContext.Provider value={{ socket, updateSocket, socketRoom, updateSocketRoom, socketNickname, updateSocketNickname}}>
            { children }
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext);
