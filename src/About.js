import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Nav from './Nav';
import AboutTab from './AboutTabs';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Image from './img/pic1.jpg'; // Import using relative path
const useStyles = makeStyles((theme) => ({
    vision: {
        backgroundColor: "#6aa6b6",
        padding: '60px',
        boxSizing: 'border-box',
        margin: '0 auto',
        '& p': {
            fontSize: '1.1em !important',
        }
    },
    impact: {
        backgroundColor: "#eb875a",
        padding: '60px',
        boxSizing: 'border-box',
        margin: '0 auto',
        '& p': {
            fontSize: '1.1em !important',
        }
    },
    aboutHeader: {
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        height: "500px",
        backgroundPosition: "center center",
        position: 'relative',
    },
    aboutBg: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: '-100',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        boxSizing: 'border-box',
        paddingTop: '200px',
        fontSize: '1.2em !important',
    },
    imageIcon: {
        height: '100%',
    },
    imageRoot: {
        width: '100%',
        textAlign: 'center',
        display: 'block',
        height: '100px',
    },
    circleH2: {
        textAlign: 'center',
    },
}));

function About() {
    const classes = useStyles();
    return (
        <Grid container spacing={0}>
            <Grid item component="Paper" xs={12} md={6} className={classes.vision}>
                <Container>
                    <Icon className={classes.imageRoot}>
                        <img className={classes.imageIcon} src="./icons8-family-52.svg"/>
                    </Icon>

                    <Typography variant="h5" component="h2" className={classes.circleH2}>
                        Vision
                    </Typography>
                    <Typography variant="body2" component="p">
                        Bringing people and organizations together to create a network of support for youth
                        with experience in foster care as they transition to a successful future.
                    </Typography>
                </Container>
            </Grid>
            <Grid item xs={12} md={6} className={classes.impact} component="Paper">
                <Container>
                    <Icon className={classes.imageRoot}>
                        <img className={classes.imageIcon} src="./icons8-welfare-100.svg"/>
                    </Icon>
                    <Typography variant="h5" component="h2" className={classes.circleH2}>
                        Desired Impact
                    </Typography>
                    <Typography variant="body2" component="p">
                        The New Foster Care desires to improve pathways for young people and to build their
                        foundation of support to increase their sense of self-worth. We also desire to utilize
                        their experiences to inform the work in foster care and assist others from similar
                        backgrounds and experiences.
                    </Typography>
                </Container>
            </Grid>
            <Grid item xs={12}>
                <AboutTab/>
            </Grid>
        </Grid>
    );
};

export function AboutHead() {
    const classes = useStyles();
    return (
        <AppBar position="static" id={"header-video"} className={classes.aboutHeader}>
            <Nav/>
            <div className={classes.aboutBg}>
                <Container maxWidth="md">
                    <h1>Our Mission</h1>
                    <p>
                        The mission of The New Foster Care is to positively change the trajectory of young
                        people as they transition from the foster care system, to strengthen their networks of
                        support, to improve the systems of care that impact young people with experience in
                        foster care. In short, to develop a NEW Foster Care.
                    </p>
                </Container>
            </div>
        </AppBar>
    )
};

export default About;
