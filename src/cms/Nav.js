import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import {
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    fullnav: {
        width: '100%',
        textAlign: 'center',
        '& .MuiButtonBase-root': {
            width: 'auto',
            display: 'inline-flex',
            '& a': {
                textDecoration: 'none',
            },
            '& .MuiListItemText-primary': {
                textDecoration: 'none',
            },
        },
    },
}));

export default function Nav() {


    const classes = useStyles();

    const list = anchor => (
        <List>
            <ListItem button key={"Staff"}>
                <ListItemText primary={<Link to="/cms/staff">Staff</Link>}/>
            </ListItem>
            <ListItem button key={"News"}>
                <ListItemText primary={<Link to="/cms/news">News</Link>}/>
            </ListItem>
            <ListItem button key={"Pages"}>
                <ListItemText primary={<Link to="/cms/pages">Pages</Link>}/>
            </ListItem>
        </List>
    );
    return (
        <Toolbar className={classes.navbar} position="static">
            <div role="presentation" className={classes.fullnav}>
                {list()}
            </div>
        </Toolbar>
    );
}
