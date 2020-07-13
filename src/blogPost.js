import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import AppBar from '@material-ui/core/AppBar';
import Nav from './Nav';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {makeStyles} from '@material-ui/core/styles';
import Image from './img/pic3.jpg'; // Import using relative path
import MUIRichTextEditor from "mui-rte";
import BlogLatest from './blogLatest';
import {
    useParams
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    involvedHeader: {
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        height: "500px",
        backgroundPosition: "center center",
        position: 'relative',
    },
    involvedBg: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: '-100',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        boxSizing: 'border-box',
        paddingTop: '200px',
    },
    pBody: {
        '& p': {
            fontSize: '1.1em',
        }
    },
    postHead: {
        textAlign: 'left',
        fontSize: '32px',
        fontWeight: 'bold',
        marginTop: '20px',
        color: '#eb875a',
    },
    postSubhead: {
        color: '#6aa6b6',
        display: 'block',
        fontSize: '24px',
    },
    articleBody: {
        paddingTop: '50px',
    },
    facebokIcon: {
        color: '#3b5998',
        fontSize: '50px',
    },

    twitterIcon: {
        color: '#00aced',
        fontSize: '50px',
    },

    instagramIcon: {
        color: '#ff0797',
        fontSize: '50px',
    },
    socialHead: {
        fontSize: '24px'
    },
    donate: {
        backgroundColor: '#eb875a !important',
        display: 'block',
        margin: '0 auto',
    },
    contact: {
        backgroundColor: '#6aa6b6 !important',
        display: 'block',
        margin: '0 auto',
    },
    centerAlign: {
        textAlign: 'center',
    }
}));

export default function BlogPost() {

    const [state, setState] = useState({
        id: '',
        title: '',
        subTitle: '',
        article: '',
        date: '',
    });
    const classes = useStyles();
    let {articleId} = useParams();
    const requestOptionsGet = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    };

    useEffect(() => {
// Update the document title using the browser API

        fetch('http://localhost:3500/api/blog/' + articleId, requestOptionsGet)
            .then((result) => result.json())
            .then(
                (result) =>
                    setState({
                        ...state,
                        id: articleId,
                        title: result.title,
                        subTitle: result.subTitle,
                        article: result.article,
                        date: result.date_created,
                    })
            )
    }, []);

    return (

        <Container className={classes.pBody}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <br/>
                </Grid>
                <Grid item xs={9}>
                    <Typography gutterBottom component="h1" className={classes.postHead}>{state.title}</Typography>
                    <Typography gutterBottom component="span"
                                className={classes.postSubhead}>{state.subTitle}</Typography>
                    <Typography gutterBottom component="span" className={classes.postDate}>{state.date}</Typography>
                    <MUIRichTextEditor
                        className={classes.articleBody}
                        defaultValue={state.article}
                        readOnly={true}
                        toolbar={false}
                    />
                </Grid>
                <Grid item xs={3}>

                    <Card className={classes.root}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Latest News
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <BlogLatest/>
                        </CardActions>
                        <CardActions>
                            <Button variant="contained" className={classes.donate}>donate</Button>
                            <Button variant="contained" className={classes.contact}>contact</Button>
                        </CardActions>
                        <CardActions>
                            <Grid container>
                                <Grid item className={classes.centerAlign} xs={4}><a href="#"><FacebookIcon
                                    className={classes.facebokIcon}/></a></Grid>
                                <Grid item className={classes.centerAlign} xs={4}><a href="#"><TwitterIcon
                                    className={classes.twitterIcon}/></a></Grid>
                                <Grid item className={classes.centerAlign} xs={4}><a href="#"><InstagramIcon
                                    className={classes.instagramIcon}/></a></Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        </Container>
    );
}

export function BlogPostHead() {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.involvedHeader}>
            <Nav/>
            <div className={classes.involvedBg}>
                <Container maxWidth="md">
                    <h1>News</h1>
                </Container>
            </div>
        </AppBar>
    )
};
