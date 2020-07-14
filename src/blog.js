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
import BlogLatest from './blogLatest';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import {makeStyles} from '@material-ui/core/styles';
import Image from './img/pic9.jpg'; // Import using relative path
import Pagination from '@material-ui/lab/Pagination';

import {
    useRouteMatch
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
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#eb875a',
    },
    postSubhead: {
        color: '#6aa6b6',
        display: 'block',
        fontSize: '24px',
    },
    postButton: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#eb875a',
    },

    goToPost: {
        color: '#ffdd70',
        fontSize: '50px',
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
    },
    heightAdjust: {
        minHeight: '200px',
    },
    mobileHide: {
        [theme.breakpoints.down('md')]: {
            display: 'none !important',
        },
    }
}));

export default function Blog() {


    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(1);

    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    };

    useEffect(() => {
// Update the document title using the browser API
        setPage(page);
        fetch('//'+window.location.hostname+':3500/api/blog/posts?page=' + page + '&per_page=9', requestOptions)
            .then((result) => result.json())
            .then(
                (result) => result.map((item) => item.totalPages ? setPageCount(item.totalPages) : setData(result))
            )
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };


    return (

        <Container className={classes.pBody}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <br/>
                </Grid>
                <Grid item container alignItems="stretch" spacing={2} xs={12} lg={9}>
                    {
                        data.map((item) => item.title ? <Item item={item}/> : null)
                    }
                    <Grid item xs={12}>
                        <Pagination page={page} count={pageCount} onChange={handlePageChange}/>
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={3}>

                    <Card className={classes.root}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Latest News
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <BlogLatest/>
                        </CardActions>
                        <CardActions className={classes.mobileHide}>
                            <Button variant="contained" className={classes.donate}>donate</Button>
                            <Button variant="contained" className={classes.contact}>contact</Button>
                        </CardActions>
                        <CardActions className={classes.mobileHide}>
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

export function BlogHead() {
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

function Item(props) {
    let {path, url} = useRouteMatch();
    const classes = useStyles();
    const handleClick = (event) => {
        window.location.href = 'news/' + props.item._id.$oid
    };
    return (
        <Grid item xs={12} sm={6} lg={4}   spacing={2}>
            <Card>
            <CardActionArea className={classes.heightAdjust} onClick={handleClick}>
                <CardContent>
                    <Typography className={classes.postHead} gutterBottom variant="h5" component="h2">
                        {props.item.title}
                    </Typography>
                    <Typography className={classes.postSubhead} variant="body2" color="textSecondary" component="p">
                        {props.item.subTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.item.date_created}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.bottom}>
                <Button onClick={handleClick} className={classes.postButton} size="small" color="primary">
                    Read
                </Button>
            </CardActions>
            </Card>
        </Grid>

    )
}
