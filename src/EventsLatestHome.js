import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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
        backgroundColor: '#6aa6b6',
        padding: '20px'
    },
    boxH2: {
        textAlign: 'center',

    },
}));

export default function EventsLatest() {

    const classes = useStyles();

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
                        Latest Events
                    </Typography>
                </Grid>
                <Card className={classes.newsCards}>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Events Coming Soon!
                            </Typography>
                        </CardContent>
                </Card>
            </Grid>
        </Paper>
    );
}



