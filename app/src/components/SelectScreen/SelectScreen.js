import React, {useState} from 'react';
import {useSocket} from '../../hooks/useSocket';
import {useClientDetails} from '../../hooks/useClientDetails';
import SelectUsername from '../SelectUsername';
import SelectRoom from '../SelectRoom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(20),
            width: '25ch',
      },
    },
    button: {
        '& > *': {
            // marginTop: theme.spacing(1),
        },
    },
  }));

export default function SelectScreen() {
    const history = useHistory();
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("community");
    const { socket } = useSocket();
    const { updateClientUsername, updateClientRoom } = useClientDetails();

    const handleSubmit = event => {
        event.preventDefault();
        socket.emit('update-user', {user: username, room: room});
        updateClientRoom(room);
        updateClientUsername(username);
        setUsername('');
        setRoom('');
        history.push("/room");
    }

    return (
        <form>
            <div className={classes.root}>
                <SelectUsername username={username} setUsername={setUsername}/>
                <SelectRoom room={room} setRoom={setRoom}/>
                <br />
                <br />
            </div>
             <Button className={classes.button} variant="contained" color="primary" 
                    type='submit' onClick={handleSubmit.bind(this)} disabled={!(username && room)}>
                Enter Room
            </Button>
        </form>
    )
}