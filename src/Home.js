import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import FactCarousel from './homeCarousel';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Logo from './img/logo.png';
import AppBar from '@material-ui/core/AppBar';
import Nav from './Nav';
import BlogLatestHome from './blogLatestHome';
import EventsLatestHome from './EventsLatestHome';
import Image from './img/pic7.jpg'; // Import using relative path

const useStyles = makeStyles((theme) => ({
    homeHeader: {
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        height: "500px",
        backgroundPosition: "center center",
        position: 'relative',
    },
    homeBg: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: '-100',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        boxSizing: 'border-box',
        paddingTop: '200px',
    },
    accomplishments: {
        backgroundColor: "#e6ffff",
    },
    eventButton: {
        backgroundColor: '#b3e5fc',
        [theme.breakpoints.up('sm')]: {
            display: 'none !important',
        },
    },
    newsButton: {
        backgroundColor: '#82b3c9',
        [theme.breakpoints.up('sm')]: {
            display: 'none !important',
        },
    },
    homeTitle: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#ffbd45 !important',
    },
    homeText: {
        textAlign: 'center',
    },
    imageIcon: {
        width: '100%',
    },
    homeH1: {
        textAlign: 'center',
        fontSize: '40px',
        color: '#ffbd45',
    },
    firstIcon: {
        backgroundColor: '#ffdd70',
    },
    secondIcon: {
        backgroundColor: '#6aa6b6',
    },
    thirdIcon: {
        backgroundColor: '#eb875a',
    },
    homeH2: {
        color: '#eb875a',
    },
    homeH2Main: {
        color: '#eb875a',
        textAlign: 'center',
    },
    heartIcon: {
        fontSize: '40px',
        color: '#ffdd70',
    },
    homeLogo: {
        height: '200px',
    },
    textIncrease: {
        fontSize: '1.1em !important',
    }
}));

function Home() {
    const classes = useStyles();
    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <br/>
            </Grid>
            <Grid item xs={12} md={12} className={classes.vision}>
                <Container>

                    <h2 className={classes.homeH2Main}>Accomplishing Change Through</h2>
                    <Timeline align="alternate">
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot className={classes.firstIcon}>
                                    <Icon classes={{root: classes.iconRoot}}>
                                        <img className={classes.imageIcon} alt={""} src="./icons8-family-52.svg"/>
                                    </Icon>
                                </TimelineDot>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="h6" component="h2">Servicing at-risk families</Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot className={classes.secondIcon}>
                                    <Icon classes={{root: classes.iconRoot}}>
                                        <img className={classes.imageIcon} alt={""} src="./icons8-welfare-100.svg"/>
                                    </Icon>
                                </TimelineDot>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="h6" component="h2">Supporting foster & adoptive
                                    families.</Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot className={classes.thirdIcon}>
                                    <Icon classes={{root: classes.iconRoot}}>
                                        <img className={classes.imageIcon} alt={""} src="./icons8-teenager-male-100.svg"/>
                                    </Icon>
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="h6" component="h2">Strengthening youth who are transitioning-out of
                                    foster care with future opportunities.</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>


                </Container>
            </Grid>
            <Grid item xs={12}>
                <br/>
            </Grid>
            <Grid item xs={12}>
                <Container>
                    <Grid container spacing={2} alignItems="stretch">
                        <Grid item xs={12} md={6} className={classes.homeText}>
                            <Container>

                                <h2 className={classes.homeH2}>Overview of Foster Care in America</h2>

                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FavoriteBorderIcon className={classes.heartIcon}/>
                                        </ListItemIcon>
                                        <ListItemText className={classes.textIncrease}
                                                      primary={"More than half of students who enter the foster care system must change schools when they enter care, and more than one-third of 17–18-year-olds in foster care have changed schools five or more times."}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FavoriteBorderIcon className={classes.heartIcon}/>
                                        </ListItemIcon>
                                        <ListItemText className={classes.textIncrease}
                                                      primary={"Only one-half of students in foster care complete high school by age 18."}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FavoriteBorderIcon className={classes.heartIcon}/>
                                        </ListItemIcon>
                                        <ListItemText className={classes.textIncrease}
                                                      primary={"Children in foster care are diagnosed with PTSD at approximately twice the rate of U.S. war veterans."}/>
                                    </ListItem>

                                </List>
                            </Container>
                        </Grid>
                        <Grid item xs={12} md={6}>

                            <FactCarousel/>

                        </Grid>
                        <Grid item xs={6}>
                            <EventsLatestHome/>
                        </Grid>
                        <Grid item xs={6}>
                            <BlogLatestHome/>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    );
}

export function HomeHead() {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.homeHeader}>
            <Nav/>
            <div className={classes.homeBg}>
                <Container maxWidth="md">
                    <h1><img className={classes.homeLogo} alt={""} src={Logo}/></h1>
                </Container>
            </div>
        </AppBar>
    )
};

export default Home;
