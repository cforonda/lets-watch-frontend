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

export default function SelectUsername({username, setUsername}) {
    let classes = useStyles();
    
    const handleUpdate = event => {
        setUsername(event.target.value);
    }

    return (
        <TextField className={classes.root} id="standard-basic" value={username} label="enter username..." 
                    onChange={handleUpdate.bind(this)}
        />
    )
}