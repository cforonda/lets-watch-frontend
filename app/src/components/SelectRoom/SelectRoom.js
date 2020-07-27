import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
      },
    },
  }));

export default function SelectRoom({room, setRoom}) {
    let classes = useStyles();

    const handleUpdate = event => {
        setRoom(event.target.value);
    }

    return (
        <TextField className={classes.root} id="standard-basic" label="enter room..."  value={room} onChange={handleUpdate.bind(this)}/>
    );
}
