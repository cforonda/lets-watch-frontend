import React from 'react';
import '../../assets/Footer/Footer.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export default function Footer() {

    const useStyles = makeStyles((theme) => ({
        root: {
            background: "radial-gradient(circle, rgba(0,151,255,1) 0%, rgba(32,163,254,1) 100%)",
        },
        text: {
            marginLeft: theme.spacing(85)
        }
        }))

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <footer>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="subtitle2" className={classes.text}>
                        Let's Watch &copy; {new Date().getFullYear()} - Created by Stephen White &amp; Champ Foronda
                    </Typography>
                </Toolbar>
            </AppBar>
            </footer>
        </div>
    )
}