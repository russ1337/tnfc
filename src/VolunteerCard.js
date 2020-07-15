import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: '100%',

    },
    submitButton: {
        backgroundColor: '#6aa6b6',
    },
    availabilityTitle: {
        padding: '20px 0',
    },
}));

export default function VolunteerCard() {

    const classes = useStyles();
    const [state, setState] = React.useState({
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        zip: '',
        city: '',
        state: '',
        phone: '',
        email: ''

    });
    const options = state.interests
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "firstName": state.firstName,
                "lastName": state.lastName,
                "address": state.address,
                "address2": state.address2,
                "zip": state.zip,
                "city": state.city,
                "state": state.state,
                "phone": state.phone,
                "email": state.email,
                "availability": state.availability,
                "interests": state.interests,
            })
        };
        fetch('//'+window.location.hostname+':3500/api/volunteer-signup', requestOptions)
            .then((result) => result.json());
    }
    const handleChange = (event) => {
        const name = event.target.name;
        let index
        if (name === 'phone') {
            const onlyNums = event.target.value.replace(/[^0-9]/g, '');
            if (onlyNums.length < 10) {
                setState({
                    ...state,
                    [name]: onlyNums,
                });
            } else if (onlyNums.length === 10) {
                const number = onlyNums.replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    '($1) $2-$3'
                );
                setState({
                    ...state,
                    [name]: number,
                });
            }
        } else if (name === 'zip') {
            const onlyNums = event.target.value.replace(/[^0-9]/g, '');
            setState({
                ...state,
                [name]: onlyNums,
            });
        } else if (event.target.type === "checkbox") {

            if (event.target.checked) {
                // add the numerical value of the checkbox to options array
                options.push(event.target.value)
                setState({
                    ...state,
                    interests: options,
                });
            } else {
                // or remove the value from the unchecked checkbox from the array
                index = options.indexOf(event.target.value)
                options.splice(index, 1)
                setState({
                    ...state,
                    interests: options,
                });
            }
        } else {
            setState({
                ...state,
                [name]: event.target.value,
            });
        }
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <form id="volunteerForm" onSubmit={handleSubmit}>
                    <Container maxWidth="sm">
                        <Grid container
                              direction="row"
                              justify="center"
                              alignItems="center"
                              spacing={2}>
                            <Grid item xs={12}>

                                <Typography component={'p'}>
                                    Volunteer Signup
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'firstName',
                                        maxLength: '20',
                                    }}
                                    value={state.firstName}
                                    label="First Name" variant="outlined"/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    onChange={handleChange}
                                    value={state.lastName}
                                    inputProps={{
                                        name: 'lastName',
                                        maxLength: '20',
                                    }}
                                    label="Last Name" variant="outlined"/>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    required
                                    onChange={handleChange}
                                    className={classes.fullWidth}
                                    inputProps={{
                                        name: 'address',
                                        maxLength: '50',
                                    }}
                                    value={state.address}
                                    label="Address" variant="outlined"/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'address2',
                                        maxLength: '50',
                                    }}
                                    value={state.address2}
                                    label="Apt Number" variant="outlined"/>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField className={classes.fullWidth}
                                           required
                                           onChange={handleChange}
                                           value={state.city}
                                           inputProps={{
                                               name: 'city',
                                               maxLength: '20',
                                           }}
                                           label="City" variant="outlined"/>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="state-id">State</InputLabel>
                                    <Select
                                        required
                                        native
                                        value={state.state}
                                        onChange={handleChange}
                                        label="State"
                                        inputProps={{
                                            name: 'state',
                                            id: 'state-id',
                                        }}
                                    >
                                        <option aria-label="None" value=""/>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    onChange={handleChange}
                                    value={state.zip}
                                    inputProps={{
                                        name: 'zip',
                                        type: 'tel',
                                        maxLength: '5',
                                    }}
                                    label="Zipcode" variant="outlined"/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    onChange={handleChange}
                                    value={state.email}
                                    inputProps={{
                                        name: 'email',
                                        type: 'email',
                                        maxLength: '50',
                                    }}
                                    label="Email" variant="outlined"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    onChange={handleChange}
                                    value={state.phone}
                                    inputProps={{
                                        name: 'phone',
                                        type: 'tel',
                                        maxLength: '10',
                                    }}
                                    label="phone" variant="outlined"/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Interests</FormLabel>
                                    <FormGroup required aria-label="position" column>
                                        <FormControlLabel
                                            value="One Time"
                                            onChange={handleChange}
                                            control={<Checkbox color="primary"/>}
                                            label="One Time"
                                            labelPlacement="end"
                                            inputProps={{
                                                name: 'oneTime',
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Event Support"
                                            onChange={handleChange}
                                            control={<Checkbox color="primary"/>}
                                            label="Event Support"
                                            labelPlacement="end"
                                            inputProps={{
                                                name: 'eventSupport',
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Mentorship"
                                            onChange={handleChange}
                                            control={<Checkbox color="primary"/>}
                                            label="Mentorship"
                                            labelPlacement="end"
                                            inputProps={{
                                                name: 'mentorship',
                                            }}
                                        />
                                        <FormControlLabel
                                            value={state.other}
                                            onChange={handleChange}
                                            control={<Checkbox color="primary"/>}
                                            inputProps={{
                                                name: 'otherCheck',
                                            }}
                                            label={
                                                <TextField
                                                    onChange={handleChange}
                                                    value={state.other}
                                                    inputProps={{
                                                        name: 'other',
                                                        maxLength: '20',
                                                    }}
                                                    label="Other" variant="filled"/>
                                            }
                                            labelPlacement="end"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.fullWidth}>
                                    <FormLabel className={classes.availabilityTitle}
                                               component="legend">Availability</FormLabel>
                                    <TextField
                                        label="Please tell us your availability"
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                        className={classes.fullWidth}
                                        onChange={handleChange}
                                        value={state.availability}
                                        inputProps={{
                                            name: 'availability',
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" form="volunteerForm" className={classes.submitButton}
                                        variant="contained">Submit</Button>
                            </Grid>

                        </Grid>
                    </Container>
                </form>
            </CardContent>
        </Card>
    );
}
