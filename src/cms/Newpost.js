import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import MUIRichTextEditor from "mui-rte";
import TextField from '@material-ui/core/TextField';
import { convertToRaw } from 'draft-js'
import {DropzoneArea} from 'material-ui-dropzone'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import cookie from 'react-cookies';

const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: '100%',

    },
}));

export default function Newpost() {
    const classes = useStyles();
    const [files, setFiles] = useState([])
    const [state, setState] = React.useState({
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        title: '',
        subTitle: '',
        article: '',
        pictures: [],
    });
    const handleChangeFile = (uploadFiles) => {
        setFiles(files.concat(uploadFiles));
    };
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

            fetch('//'+'//'+window.location.hostname+':3500/api/files/' + state.id + '/' + files[i].name, requestOptionsPost)
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
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + cookie.load('session')
            },
            body: JSON.stringify({"folderId": state.id, "title": state.title, "subTitle": state.subTitle, "article": state.article,  "pictures":state.pictures})
        };
        fetch('//'+window.location.hostname+':3500/api/blog/posts', requestOptions)
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
            article: JSON.stringify(convertToRaw(event.getCurrentContent()))
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
                        label="Type something here..."
                        onChange={handleRichtext}
                        inlineToolbar={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <br/>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" form="postForm" variant="contained">Post</Button>
                </Grid>
            </Grid>


        </form>
    );
}

function Item(props) {
    const classes = useStyles();
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
