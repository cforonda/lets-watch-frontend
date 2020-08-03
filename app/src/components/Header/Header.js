import React from 'react';
import '../../assets/Header/Header.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ClientDetails from '../ClientDetails';

export default function Header() {
    const useStyles = makeStyles((theme) => ({
        root: {
            background: 'radial-gradient(circle, rgba(0,151,255,1) 0%, rgba(32,163,254,1) 100%)'
        },
        icon: {
            marginRight: theme.spacing(5),
        },
        title: {
            flexGrow: 1,
        },
        button: {
            padding: "auto",
            margin: 10,
            height: 50
        }
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <PeopleAltIcon edge="start" className={classes.icon} color="inherit" aria-label="icon" />
                    <Typography variant="h5" className={classes.title}>
                        <b>Let's Watch Together</b>
                    </Typography>
                    <ClientDetails />
                </Toolbar>
            </AppBar>
        </div>
    );
}