import React, {useEffect, useState, useRef} from 'react';

import './App.css';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import Fab from '@material-ui/core/Fab';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import {makeStyles} from '@material-ui/core/styles';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import Nav from './Nav';
import Home from './Home';
import Blog, {BlogHead} from './blog';
import BlogPost, {BlogPostHead} from './blogPost';
import About, {AboutHead} from './About';
import GetInvolved, {InvolvedHead} from './Getinvolved';
import Program, {ProgramHead} from './Programs';

import ContactCard from "./ContactCard";

function App() {
    let useStyles = makeStyles((theme) => ({
        videobg: {
            background: "none",
        },
        videoCard: {
            position: "absolute",
            bottom: "0",
            width: "200px",
            left: "calc( 50% - 100px )",
            backgroundColor: "#eb875a",
            textAlign: "center",
        },
        learnButton: {
            backgroundColor: "#6aa6b6",
        },
        fullscreenBg: {
            position: 'absolute',
            overflow: 'hidden',
            zIndex: '-100',
            width: '100%',
            backgroundColor: '#000',
            '& video': {
                minWidth: '100%',
                maxHeight: window.innerHeight,
            },
        },
        contactBlock: {
            backgroundColor: '#6aa6b6 !important',
            padding: '0 0 35px 0',
            '& h2': {
                color: '#000',
                fontSize: '24px',
                fontWeight: '500',
                textAlign: 'center',
            },
            '& label': {
                top: 'auto !important',
            },

            '& button': {
                backgroundColor: '#eb875a !important',
                width: '100%',
                height: '100%',
                color: '#000',
            }
        },
        donateBlock: {
            backgroundColor: '#eb875a !important',
            padding: '0 0 35px 0',
            '& h2': {
                color: '#000',
                fontSize: '24px',
                fontWeight: '500',
                textAlign: 'center',
            },
            '& label': {
                top: 'auto !important',
            },
            '& button': {
                backgroundColor: '#6aa6b6 !important',
                width: '100%',
                height: '100%',
                color: '#000',
            }
        },
        socialMedia: {
            backgroundColor: '#ffdd70 !important',
            '& h2': {
                color: '#000',
                fontSize: '24px',
                fontWeight: '500',
                textAlign: 'center',
                padding: '20px 0 0 0',
            },
            '& a': {
                display: 'block',
                textAlign: 'center',
                fontSize: '60px',
            },
            '& a svg': {
                fontSize: '1em !important',
            }
        },
        floatingCTA: {
            position: 'fixed',
            zIndex: '10000',
            right: '0',
            left: 'auto',
            bottom: 'auto',
            top: '45%',
            textAlign: 'right',
            paddingRight: '20px',
        },
        donateFloat: {
            backgroundColor: '#eb875a !important',
            fontSize: '24px',
        },
        contactFloat: {
            backgroundColor: '#6aa6b6 !important',
            fontSize: '24px',
        },
        iconSize: {
            fontSize: '24px',
        }
    }));
    const [openContact, setOpenContact] = useState(false);
    const [contactEmail, setContactEmail] = useState('');
    const [height, setHeight] = useState(0);
    const [play, setPlay] = useState(true);
    const [sound, setSound] = useState(false);
    const ref = useRef(null);
    const learnMore = useRef(null);
    const scrollToRef = () => window.scroll({
        top: ref.current.clientHeight,
        left: 0,
        behavior: 'smooth'
    });

    useEffect(
        () => {
            if (ref.current !== null) {
                setHeight(ref.current.clientHeight);
            }
        }
    )
    const handleTogglePlay = () => {
        setPlay(!play);
        if (play) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
    };
    const handleToggleSound = () => {
        setSound(!sound);
    };
    const handleToggleFullscreen = () => {
        if (ref.current.requestFullscreen) {
            ref.current.requestFullscreen();
        } else if (ref.current.mozRequestFullScreen) {
            ref.current.mozRequestFullScreen();
        } else if (ref.current.webkitRequestFullscreen) {
            ref.current.webkitRequestFullscreen();
        } else if (ref.current.msRequestFullscreen) {
            ref.current.msRequestFullscreen();
        }
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        setOpenContact(!openContact);
    }
    const handleToggle = () => {
        setOpenContact(!openContact);
    };
    const handleChange = (evt) => {
        setContactEmail(evt.target.value)
    }

    const classes = useStyles();
    const style = {height};
    let {path, url} = useRouteMatch();
    return (
        <Router>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Switch>
                        <Route exact path="/programs">
                            <ProgramHead/>
                        </Route>
                        <Route path="/news/:articleId">
                            <BlogPostHead/>
                        </Route>
                        <Route exact path="/news">
                            <BlogHead/>
                        </Route>
                        <Route exact path="/getinvolved">
                            <InvolvedHead/>
                        </Route>
                        <Route exact path="/aboutus">
                            <AboutHead/>
                        </Route>
                        <Route exact path="/">
                            <AppBar position="static" id={"header-video"} className={classes.videobg} style={style}>
                                <Nav/>
                                <div className={classes.fullscreenBg} style={style}>
                                    <video id="videoBg" autoPlay loop muted={sound} ref={ref} src="./video.mp4"
                                           type="video/mp4">
                                    </video>
                                </div>
                                <Card className={classes.videoCard}>

                                    <CardContent>
                                        <IconButton onClick={handleTogglePlay} aria-label="play/pause">
                                            {play ? <PlayArrowIcon/> : <PauseIcon/>}
                                        </IconButton>
                                        <IconButton onClick={handleToggleSound} aria-label="mute/unmute">
                                            {sound ? <VolumeUpIcon/> : <VolumeOffIcon/>}
                                        </IconButton>
                                        <IconButton onClick={handleToggleFullscreen} aria-label="fullscreen">
                                            <FullscreenIcon/>
                                        </IconButton>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.learnButton}
                                            onClick={scrollToRef}
                                            endIcon={<ArrowDropDownIcon/>}
                                        >
                                            Learn More
                                        </Button>
                                    </CardContent>

                                </Card>
                            </AppBar>
                        </Route>
                    </Switch>

                </Grid>
                <Switch>
                    <Route exact path="/programs">
                        <Program/>
                    </Route>
                    <Route path="/news/:articleId">
                        <BlogPost/>
                    </Route>
                    <Route exact path="/news">
                        <Blog/>
                    </Route>
                    <Route exact path="/getinvolved">
                        <GetInvolved/>
                    </Route>
                    <Route exact path="/aboutus">
                        <About/>
                    </Route>
                    <Route exact path="/">
                        <div ref={learnMore}/>
                        <Home/>
                    </Route>
                </Switch>
                <Grid item xs={12}>
                    <Paper className={classes.socialMedia}>
                        <Container maxWidth="sm">
                            <h2>Follow Us On Social Media!</h2>
                            <Grid container spacing={0}>
                                <Grid item xs={4}><a className={"facebokIcon"}
                                                     onClick={() => window.open("https://www.facebook.com/TheNewFosterCare/", "_blank")}><FacebookIcon/></a></Grid>
                                <Grid item xs={4}><a className={"twitterIcon"}
                                                     onClick={() => window.open("https://twitter.com/NewFosterCare", "_blank")}><TwitterIcon/></a></Grid>
                                <Grid item xs={4}><a className={"instagramIcon"}
                                                     onClick={() => window.open("https://www.facebook.com/TheNewFosterCare/", "_blank")}><InstagramIcon/></a></Grid>
                            </Grid>
                        </Container>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.contactBlock}>
                        <Container maxWidth="xs">
                            <FormControl fullWidth variant="outlined">
                                <h2>Contact Us</h2>
                                <form id="contactForm" onSubmit={handleSubmit}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={8}>
                                            <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment
                                                    position="start"><AlternateEmailIcon/></InputAdornment>}
                                                labelWidth={60}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                form="contactForm"
                                            >
                                                Send
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </FormControl>
                        </Container>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.donateBlock}>
                        <Container maxWidth="xs">
                            <FormControl fullWidth variant="outlined">
                                <h2>Donate</h2>
                                <Grid container spacing={1}>
                                    <Grid item xs={8}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment
                                                position="start"><AttachMoneyIcon/></InputAdornment>}
                                            labelWidth={60}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >
                                            Give
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
            <div className={classes.floatingCTA}>
                <Fab className={classes.donateFloat} variant="extended">
                    <AttachMoneyIcon className={classes.iconSize}/>
                    Donate
                </Fab><br/>
                <br/>
                <Fab className={classes.contactFloat} variant="extended" onClick={handleToggle}>
                    <PhoneAndroidIcon className={classes.iconSize}/>
                    Contact
                </Fab>
            </div>
            {openContact && <ContactCard email={contactEmail}/>}
        </Router>
    );
}

export default App;
