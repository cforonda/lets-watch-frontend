import React from 'react';
import Button from '@material-ui/core/Button';
import {useClientDetails} from '../../hooks/useClientDetails';

export default function Room() {
    const { clientRoom } = useClientDetails();
    return <Button color="inherit"><b>{clientRoom}</b></Button>
}