import React from 'react';
import User from './User';
import Room from './Room';
import {useClientDetails} from '../../hooks/useClientDetails';

export default function ClientDetails() {
    const {clientUsername, clientRoom} = useClientDetails();
    return (
        clientUsername && clientRoom ?
        <div>
            <User />
            <Room />
        </div> : <></>
    )
}