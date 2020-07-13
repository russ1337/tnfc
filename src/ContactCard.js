import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import BusinessIcon from '@material-ui/icons/Business';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import SendEmail from './EmailForm';


export default function ContactCard(props) {

    const [invalid, setInvalid] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(props.email);

    const borderColor = success ? 'green !important' : '';

    const useStyles = makeStyles((theme) => ({
        contactText: {
            width: '100%',
        },
        contactButton: {
            backgroundColor: '#6aa6b6',
        },
        twitterIcon: {
            color: '#00aced',
            fontSize: '50px',
        },
        facebookIcon: {
            color: '#3b5998',
            fontSize: '50px',
        },
        instagramIcon: {
            color: '#ff0797',
            fontSize: '50px',
        },
        addressBold: {
            fontWeight: 'bold',
        },
        iconSection: {
            textAlign: 'center',
        },
        inputValidate: {
            '& fieldset': {
                borderColor: borderColor,
            },
        },
        socialTitle: {
            fontSize: '1.2em',
        }
    }));
    const classes = useStyles();
    const handleSubmit = (evt) => {
        evt.preventDefault();
        // POST request using fetch inside useEffect React hook
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"email": email})
            };
            fetch('http://localhost:3500/api/newsletter-signup', requestOptions)
                .then((result) => result.json())
                .then((result) => {

                    if (result.id) {
                        setSuccess(true)
                        setInvalid(false)
                        setError('')
                    } else {
                        setInvalid(true)
                    }

                });
        } else {
            setInvalid(true)
        }
    }
    const [open, setOpen] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle className={classes.root} id="simple-dialog-title">Contact Us!</DialogTitle>
            <DialogContent>
                <Container maxWidth="xs">
                    <Typography gutterBottom component="p">

                        <List className={classes.root}>
                            <ListItem>
                                <ListItemAvatar>
                                    <BusinessIcon/>
                                </ListItemAvatar>
                                <ListItemText primary="The New Foster Care" secondary={'1615 S. Telegraph Road ' +
                                <br/> + ' Bloomfield Hills, MI 48302'}/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <AlternateEmailIcon/>
                                </ListItemAvatar>
                                <ListItemText primary="(248)884-7645"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <PhoneAndroidIcon/>
                                </ListItemAvatar>
                                <ListItemText primary="change@thenewfostercare.org"/>
                            </ListItem>
                        </List>
                    </Typography>
                </Container>
                <br/>
                <Divider/>
                <br/>
                <form id="newsletterForm" onSubmit={handleSubmit}>
                    <Container maxWidth="xs">
                        <Grid container
                              direction="row"
                              justify="center"
                              alignItems="center"
                              spacing={2}>
                            <Grid item xs={12}>
                                <Typography component="p">
                                    Sign Up For Our Newsletter!
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    error={invalid}
                                    id="newsletter-email"
                                    label="Email"
                                    variant="outlined"
                                    className={classes.inputValidate}
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button type="submit" form="newsletterForm" className={classes.contactButton}
                                        variant="contained">Sign Up</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </form>
                <br/>
                <Divider/>
                <br/>
                <Container maxWidth="xs">
                    <SendEmail/>
                </Container>
                <br/>
                <Divider/>
                <br/>
                <Container maxWidth="xs">
                    <Grid container
                          direction="row"
                          justify="center"
                          alignItems="center"
                          spacing={2}>
                        <Grid item xs={12}>
                            <Typography className={classes.socialTitle} component="span">
                                Follow Us on Social Media!
                            </Typography>
                        </Grid>
                        <Grid className={classes.iconSection} item xs={4}><FacebookIcon
                            className={classes.facebookIcon}
                            onClick={() => window.open("https://www.facebook.com/TheNewFosterCare/", "_blank")}/></Grid>
                        <Grid className={classes.iconSection} item xs={4}><TwitterIcon
                            className={classes.twitterIcon}
                            onClick={() => window.open("https://twitter.com/NewFosterCare", "_blank")}/></Grid>
                        <Grid className={classes.iconSection} item xs={4}><InstagramIcon
                            className={classes.instagramIcon}
                            onClick={() => window.open("https://www.instagram.com/thenewfostercare/", "_blank")}/></Grid>
                    </Grid>
                </Container>
            </DialogContent>
        </Dialog>
    );
}
