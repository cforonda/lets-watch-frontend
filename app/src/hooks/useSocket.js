import React, { useState, useContext, createContext, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://lets-watch-backend.herokuapp.com/";
const SocketContext = createContext();

/* 
    This function is responsible for providing the socket connection to the client
    and will be uitlized in index.js to ensure re-renders do not cause an infinite
    loop of socket connections.
*/
export default function SocketProvider({ children }) {
    const [socket, setSocket] = useState();

    useEffect(() => {
        setSocket(socketIOClient(API_ENDPOINT));
    }, []);


    const updateSocket = socketIOClient => setSocket(socketIOClient);

    console.log(`Socket Connection: ${API_ENDPOINT}`); // 

    return (
        <SocketContext.Provider value={{ socket, updateSocket }}>
            { children }
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext);
