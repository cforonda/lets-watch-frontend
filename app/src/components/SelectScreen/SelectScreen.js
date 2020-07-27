import React, {useState, useEffect} from 'react';
import {useSocket} from '../../hooks/useSocket';
import SelectUsername from '../SelectUsername';
import SelectRoom from '../SelectRoom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(30),
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
    const {initializeClient, socketNickname, updateSocketNickname, socketRoom, updateSocketRoom} = useSocket();

    useEffect(() => {
        console.log('Socket Nickname: ', socketNickname);
        console.log('Socket Room: ', socketRoom);
    }, [socketNickname, socketRoom])


    const handleSubmit = event => {
        event.preventDefault();
        updateSocketNickname(username);
        updateSocketRoom(room);
        setUsername('');
        setRoom('');
        initializeClient();
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
                    type='submit' onClick={handleSubmit} disabled={!(username && room)}>
                Enter Room
            </Button>
        </form>
    )
}