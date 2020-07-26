import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

export default function Form({callback = fnc => fnc}) {
    // set hooks
    const [videoId, setVideoId] = useState("");

    const updateVideoId = (text) => setVideoId(text);
    const clearVideoId = () => setVideoId("");
    const handleOnChange = (event) => updateVideoId(event.target.value);
    const handleOnSubmit = (event) => {
        event.preventDefault();
        callback(videoId.repeat(1));
        clearVideoId();
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch'
            }
        }
    }));

    const buttonStyle = {
        'padding': 'auto',
        'width': '100px',
        'margin': '10px',
        'height': '50px'
    };

    const classes = useStyles();

    return (
        <div className="form-container">
            <form onSubmit={handleOnSubmit} className={classes.root} noValidate autoComplete="off">
                <TextField 
                    id="outlined-basic"
                    label="Youtube Link"
                    variant="outlined"
                    value={videoId}
                    onChange={handleOnChange}
                    required
                />

                <Button 
                    variant="contained"
                    style={buttonStyle}
                    type="submit"> Submit </Button>
            </form>
        </div>
    )
}