import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: '100%',

    },
    submitButton: {
        backgroundColor: '#6aa6b6',
    },
}));

export default function SendMail() {

    const classes = useStyles();
    const [state, setState] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: '',

    });
    const options = state.interests
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "name": state.name,
                "email": state.email,
                "subject": state.subject,
                "message": state.message,
            })
        };
        fetch('//'+window.location.hostname+':3500/api/send-mail', requestOptions)
            .then((result) => result.json());
    }
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });

    };

    return (
        <form id="contactForm" onSubmit={handleSubmit}>
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={2}>
                <Grid item xs={12}>

                    <Typography component="p">
                        Send Us a Message!
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        onChange={handleChange}
                        inputProps={{
                            name: 'name',
                            maxlength: '20',
                        }}
                        value={state.firstName}
                        label="Name" variant="outlined"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        onChange={handleChange}
                        inputProps={{
                            name: 'email',
                            maxlength: '20',
                            type: 'email',
                        }}
                        value={state.firstName}
                        label="Email" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        className={classes.fullWidth}
                        onChange={handleChange}
                        inputProps={{
                            name: 'subject',
                            maxlength: '20',
                        }}
                        value={state.firstName}
                        label="Subject" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.fullWidth}>
                        <TextField
                            label="Message"
                            multiline
                            rows={4}
                            variant="outlined"
                            className={classes.fullWidth}
                            onChange={handleChange}
                            value={state.availability}
                            inputProps={{
                                name: 'message',
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" form="contactForm" className={classes.submitButton}
                            variant="contained">Submit</Button>
                </Grid>
            </Grid>
        </form>
    );
}
