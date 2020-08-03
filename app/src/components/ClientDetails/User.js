import React from 'react';
import Button from '@material-ui/core/Button';
import {useClientDetails} from '../../hooks/useClientDetails';

export default function User() {
    const { clientUsername } = useClientDetails();
    return <Button color="inherit"><b>{clientUsername}</b></Button>
}