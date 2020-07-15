import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Nav from './Nav';
import ProgramForm from './ProgramForm';
import {makeStyles} from '@material-ui/core/styles';
import Image from './img/pic5.jpg'; // Import using relative path
import Chart from './img/transition-chart.jpg'; // Import using relative path

const useStyles = makeStyles((theme) => ({
    programHeader: {
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        height: "500px",
        backgroundPosition: "center center",
        position: 'relative',
    },
    programBg: {
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
    },
    orangeText: {
        fontSize: '1.4em',
        color: '#eb875a',
        fontWeight: '600',
    },
    p1: {
        fontSize: '1.2em !important',
        fontWeight: '500',
    },
    programImage: {
        float: 'right',
        width: '400px',
        padding: '20px',
        [theme.breakpoints.down('md')]: {
            float: 'none !important',
            margin: '0 auto',
        },
    }
}));

export default function Impact() {
    const classes = useStyles();
    return (

        <Container className={classes.pBody} maxWidth="md">
            <p>Many young people aging out of foster care lack the necessary skills, resources, and support to continue
                development in adulthood. To address this issue, TNFC has developed The Bridge, an eclectic transitional
                support model serving young people ages 14 to 29.</p>
            <p>
                The Bridge program focuses on improving a young person’s transition into early adulthood thereby
                increasing their chance for a successful life. The program’s primary focus is to strengthen the young
                person’s life skills and network of support to navigate life’s journey.
            </p>
        </Container>
    );
}

export function ImpactHead() {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.programHeader}>
            <Nav/>
            <div className={classes.programBg}>
                <Container maxWidth="md">
                    <h1>Our Impact</h1>
                </Container>
            </div>
        </AppBar>
    )
};
