import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import MUIRichTextEditor from "mui-rte";
import TextField from '@material-ui/core/TextField';
import {DropzoneArea} from 'material-ui-dropzone'
import cookie from 'react-cookies';
import { convertToRaw } from 'draft-js'

const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: '100%',

    },
}));

export default function NewStaff() {
    const classes = useStyles();
    const [state, setState] = useState({
        name: '',
        degree: '',
        title: '',
        description: '',
        photo: ''
    });
    const handleChangeFile = (files) => {
        files.forEach((file) => {
            const reader = new FileReader()
            reader.readAsDataURL(new Blob([file]));
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                setState({
                    ...state,
                    photo:  reader.result.split(',')[1]
                });
            }

        })
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + cookie.load('session')
            },
            body: JSON.stringify({
                "name": state.name,
                "degree": state.degree,
                "title": state.title,
                "description": state.description,
                "photo": state.photo,
            })
        };
        fetch('//'+window.location.hostname+':3500/api/staff', requestOptions)
            .then((result) => result.json())
            .then((result) => {


            });
    }
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const handleRichtext = event => {
        setState({
            ...state,
            description: JSON.stringify(convertToRaw(event.getCurrentContent()))
        });
    };

    return (
        <form id="postForm" onSubmit={handleSubmit}>

            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1">
                        Make a new staff member
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        onChange={handleChange}
                        className={classes.fullWidth}
                        inputProps={{
                            name: 'name',
                        }}
                        value={state.name}
                        label="name" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onChange={handleChange}
                        className={classes.fullWidth}
                        inputProps={{
                            name: 'degree',
                        }}
                        value={state.degree}
                        label="degree" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        onChange={handleChange}
                        className={classes.fullWidth}
                        inputProps={{
                            name: 'title',
                        }}
                        value={state.title}
                        label="title" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <MUIRichTextEditor
                        label="Type something here..."
                        onChange={handleRichtext}
                        inlineToolbar={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DropzoneArea
                        filesLimit={1}
                        onChange={handleChangeFile}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" form="postForm" variant="contained">Post</Button>
                </Grid>

            </Grid>


        </form>
    );
}
