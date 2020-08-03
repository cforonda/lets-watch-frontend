import React, { useState, useContext, createContext } from 'react';

const ClientDetailsContext = createContext();

export default function ClientDetailsProvider({ children }) {
    const [clientUsername, setClientUsername] = useState();
    const [clientRoom, setClientRoom] = useState();

    const updateClientUsername = clientUsername => setClientUsername(clientUsername);
    const updateClientRoom = clientRoom => setClientRoom(clientRoom);


    return (
        <ClientDetailsContext.Provider value={{ clientUsername, updateClientUsername, clientRoom, updateClientRoom }}>
            { children }
        </ClientDetailsContext.Provider>
    )
}

export const useClientDetails = () => useContext(ClientDetailsContext);
