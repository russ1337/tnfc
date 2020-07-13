import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Nav from './Nav';
import {makeStyles} from '@material-ui/core/styles';
import Image from './img/pic3.jpg'; // Import using relative path
import VolunteerCard from './VolunteerCard';

const useStyles = makeStyles((theme) => ({
    involvedHeader: {
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        height: "500px",
        backgroundPosition: "center center",
        position: 'relative',
    },
    involvedBg: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: '-100',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        boxSizing: 'border-box',
        paddingTop: '200px',
    },
    pBody: {
        '& p': {
            fontSize: '1.1em',
        }
    }
}));

export default function GetInvolved() {
    const classes = useStyles();
    return (

        <Container className={classes.pBody} maxWidth="md">
            <br/>
            <p>Our volunteers and supporters are the heartbeat of our organization. Their continued
                compassion and commitment to the young people we serve is both inspiring and vital for the
                services we provide.</p>
            <p>At TNFC, we have opportunities to get involved for every person, regardless of age or ability. From
                one-time service projects to ongoing support, our team is ready to engage and get you involved! </p>
            <p>For more information about the many opportunities available, please fill out and submit this short
                survey:</p>
            <br/>
            <Container maxWidth="sm">
                <VolunteerCard/>
            </Container>
        </Container>
    );
}

export function InvolvedHead() {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.involvedHeader}>
            <Nav/>
            <div className={classes.involvedBg}>
                <Container maxWidth="md">
                    <h1>Get Involved!</h1>
                </Container>
            </div>
        </AppBar>
    )
};
