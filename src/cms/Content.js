import React from 'react';
import Container from '@material-ui/core/Container';

import Nav from './Nav';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

export default function Pages() {
    const classes = useStyles();
    return (
        <Container className={classes.pBody} maxWidth="md">
            <Nav/>
            <br/>
            <p>Select a page to enter content for it.</p>
        </Container>
    );
}
