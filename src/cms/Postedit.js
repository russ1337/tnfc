import React, {useState, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {DropzoneArea} from 'material-ui-dropzone'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import cookie from 'react-cookies';
import MUIRichTextEditor from "mui-rte";

const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: '100%',

    },
}));

export default function Postedit(props) {
    const classes = useStyles();
    const [files, setFiles] = useState([])
    const [state, setState] = useState({
        id: '',
        title: '',
        subTitle: '',
        article: '',
        pictures: [],
    });

    const handleChangeFile = (uploadFiles) => {
        setFiles(files.concat(uploadFiles));
    };
    const ref = useRef(null);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        ref.current.save()
    }
    const handleFileSubmit = () => {
        let i
        for (i = 0; i < files.length; i++) {
            const requestOptionsPost = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + cookie.load('session')
                },
                body: files[i]
            };

            fetch('//'+window.location.hostname+':3500/api/files/' + state.id + '/' + files[i].name, requestOptionsPost)
                .then(
                    response => response.json() // if the response is a JSON object
                ).then(
                success => {
                    setState({
                        ...state,
                        pictures: state.pictures.concat(success.url), // Handle the success response object
                    });
                }
            ).catch(
                error => console.log(error) // Handle the error response object
            );

        }
    };
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
            article: data,
        })

        const requestOptionsPut = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + cookie.load('session')
            },
            body: JSON.stringify({
                "id": state.id,
                "title": state.title,
                "subTitle": state.subTitle,
                "pictures": state.pictures,
                "article": data,
            })
        };
        fetch('//'+window.location.hostname+':3500/api/blog/' + state.id, requestOptionsPut)
            .then((result) => result.json())
            .then((result) => {


            });


    };

    const requestOptionsGet = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    };


    useEffect(() => {
        // Update the document title using the browser API

        fetch('//'+window.location.hostname+':3500/api/blog/' + props.postId, requestOptionsGet)
            .then((result) => result.json())
            .then(
                (result) =>
                    setState({
                        ...state,
                        id: props.postId,
                        title: result.title,
                        subTitle: result.subTitle,
                        pictures: result.pictures,
                        article: result.article,
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
                        <DropzoneArea
                            filesLimit={5}
                            onChange={handleChangeFile}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                            maxFileSize={5000000}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleFileSubmit} variant="contained">Get Image Links</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <List className={classes.root}>
                            {
                                state.pictures.map((item) => <Item item={item}/>)
                            }
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <MUIRichTextEditor
                            ref={ref}
                            defaultValue={state.article}
                            label="Type something here..."
                            onSave={handleRichtext}
                            inlineToolbar={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <br/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" form={"postForm" + state.id} variant="contained">Post</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

function Item(props) {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar src={props.item}/>
            </ListItemAvatar>
            <ListItemText
                primary={"url: " + props.item}
            />
            <Divider variant="inset" component="li"/>
        </ListItem>
    )
}