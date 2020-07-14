import React, {useState, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {DropzoneArea} from 'material-ui-dropzone'

import cookie from 'react-cookies';
import MUIRichTextEditor from "mui-rte";
import {convertToRaw} from 'draft-js'

const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: '100%',

    },
}));


export default function StaffEdit(props) {
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
                    photo: reader.result.split(',')[1]
                });
            }

        })
    };
    const ref = useRef(null);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        ref.current.save()
    }
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const handleRichtext = (data) => {
        setState({
            ...state,
            description: data
        })

        const requestOptionsPut = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + cookie.load('session')
            },
            body: JSON.stringify({
                "id": state.postId,
                "name": state.name,
                "degree": state.degree,
                "title": state.title,
                "description": data,
                "photo": state.photo,
            })
        };

        fetch('//'+window.location.hostname+':3500/api/staff/' + state.id, requestOptionsPut)
            .then((result) => result.json())
            .then((result) => {

            })
    };

    const requestOptionsGet = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    };


    useEffect(() => {
        // Update the document title using the browser API
        fetch('//'+window.location.hostname+':3500/api/staff/' + props.postId, requestOptionsGet)
            .then((result) => result.json())
            .then(
                (result) =>
                    setState({
                        ...state,
                        id: props.postId,
                        name: result.name,
                        degree: result.degree,
                        title: result.title,
                        description: result.description,
                    })
            )
    }, [props]);
    return (

        <Container className={classes.pBody} maxWidth="md">
            <form id={"postForm" + state.id} onSubmit={handleSubmit}>

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
                            ref={ref}
                            defaultValue={state.description}
                            label="Type something here..."
                            onSave={handleRichtext}
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
                        <Button type="submit" form={"postForm" + state.id} variant="contained">Post</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
