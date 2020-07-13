import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import MUIRichTextEditor from "mui-rte";
import TextField from '@material-ui/core/TextField';

import cookie from 'react-cookies';

const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: '100%',

    },
}));

export default function Newpost() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        title: '',
        subTitle: '',
        article: '',
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + cookie.load('session')
            },
            body: JSON.stringify({"title": state.title, "subTitle": state.subTitle, "article": state.article,})
        };
        fetch('http://localhost:3500/api/blog/posts', requestOptions)
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
    const handleRichtext = (event) => {
        setState({
            ...state,
            article: event,
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
                        Write a new news post
                    </Typography>
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
                        label="Title" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        onChange={handleChange}
                        className={classes.fullWidth}
                        inputProps={{
                            name: 'subTitle',
                        }}
                        value={state.subTitle}
                        label="Subtitle" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <MUIRichTextEditor
                        defaultValue={state.article}
                        label="Type something here..."
                        onSave={handleRichtext}
                        inlineToolbar={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" form="postForm" variant="contained">Post</Button>
                </Grid>
            </Grid>


        </form>
    );
}
