import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import cookie from 'react-cookies';
import Grid from '@material-ui/core/Grid';

import {
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function App() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        email: '',
        password: '',

    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({"email": state.email, "password": state.password,})
        };
        fetch('//'+window.location.hostname+':3500/api/auth/login', requestOptions)
            .then((result) => result.json())
            .then((result) => {

                if (result.token) {
                    cookie.save('session', result.token, {path: '/'})
                    window.location.href = "/cms/"
                } else {
                    console.log('error')
                }

            });
    }
    const handleChange = (event) => {
        const name = event.target.name;
        let index
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form id="signinForm" onSubmit={handleSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        onChange={handleChange}
                        inputProps={{
                            name: 'email',
                            maxlength: '50',
                        }}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        onChange={handleChange}
                        margin="normal"
                        required
                        fullWidth
                        inputProps={{
                            name: 'password',
                            maxlength: '50',
                        }}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        form="signinForm"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/cms/signup">
                                {"Sign Up for an Account"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>

    );
}
