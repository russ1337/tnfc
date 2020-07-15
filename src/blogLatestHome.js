import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    subHead: {
        fontSize: '16px',
    },
    readButton: {
        color: '#eb875a',
    },

    newsBlock: {
        backgroundColor: '#eb875a',
        padding: '20px'
    },
    newsCards: {
        backgroundColor: '#f19d79',
    },
    boxH2: {
        textAlign: 'center',

    },
    cardTitle: {
        fontSize: '18px',
    }
}));

export default function BlogLatest() {


    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify()
        };
        fetch('//' + window.location.hostname + ':3500/api/blog/posts?page=1&per_page=4', requestOptions)
            .then((result) => result.json())
            .then(
                (result) => result.map((item) => item.title ? setData(result) : null)
            )
    }, []);


    return (
        <Paper className={classes.newsBlock}>
            <Grid container
                  className={classes.flexAdjust}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={2}>
                <Grid item xs={12}>
                    <Typography gutterBottom className={classes.boxH2} variant="h5" component="h2">
                        Latest News
                    </Typography>
                </Grid>
                {
                    data.map((item) => item.title ? <Item key={item._id.$oid} item={item}/> : null)
                }
            </Grid>
        </Paper>
    );
}


function Item(props) {
    const classes = useStyles();
    const handleClick = (event) => {
        window.location.href = '/news/' + props.item._id.$oid
    };
    return (
        <Grid item xs={6}>
            <Card className={classes.newsCards}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.cardTitle} component="h5">
                            {props.item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.item.subTitle}<br/>
                            {props.item.date_created}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" onClick={handleClick} color="primary">
                        Read
                    </Button>
                </CardActions>
            </Card>


        </Grid>
    )
}
