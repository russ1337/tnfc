import React, {useState} from 'react';

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
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home, {HomeHead} from './Home';
import Blog, {BlogHead} from './blog';
import BlogPost, {BlogPostHead} from './blogPost';
import About, {AboutHead} from './About';
import GetInvolved, {InvolvedHead} from './Getinvolved';
import Impact, {ImpactHead} from './Impact';
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
            [theme.breakpoints.down('md')]: {
                display: 'none !important',
            },
        },
        donateFloat: {
            backgroundColor: '#eb875a !important',
        },
        contactFloat: {
            backgroundColor: '#6aa6b6 !important',
        },
        iconSize: {
            fontSize: '32px !important',
        }
    }));
    const [openContact, setOpenContact] = useState(false);
    const [contactEmail, setContactEmail] = useState('');

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
                        <Route exact path="/impact">
                            <ImpactHead/>
                        </Route>
                        <Route exact path="/aboutus">
                            <AboutHead/>
                        </Route>
                        <Route exact path="/">
                           <HomeHead/>
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
                    <Route exact path="/impact">
                        <Impact/>
                    </Route>
                    <Route exact path="/aboutus">
                        <About/>
                    </Route>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                </Switch>
                <Grid item xs={12}>
                    <Paper className={classes.socialMedia}>
                        <Container maxWidth="sm">
                            <h2>Follow Us On Social Media!</h2>
                            <Grid container spacing={0}>
                                <Grid item xs={4}><a className={"facebokIcon"}
                                                     target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/TheNewFosterCare/"><FacebookIcon/></a></Grid>
                                <Grid item xs={4}><a className={"twitterIcon"}
                                                     target="_blank" rel="noopener noreferrer" href="https://twitter.com/NewFosterCare"><TwitterIcon/></a></Grid>
                                <Grid item xs={4}><a className={"instagramIcon"}
                                                     target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/thenewfostercare/"><InstagramIcon/></a></Grid>
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
                <List>
                    <ListItem className={classes.donateFloat} button>
                        <ListItemIcon>
                            <AttachMoneyIcon className={classes.iconSize}/>
                        </ListItemIcon>
                        <ListItemText className={classes.iconSize} primary="Donate" />
                    </ListItem>
                    <ListItem className={classes.contactFloat} button onClick={handleToggle}>
                        <ListItemIcon>
                            <PhoneAndroidIcon className={classes.iconSize} />
                        </ListItemIcon>
                        <ListItemText className={classes.iconSize} primary="Contact" />
                    </ListItem>
                </List>
            </div>
            {openContact && <ContactCard email={contactEmail}/>}
        </Router>
    );
}

export default App;
