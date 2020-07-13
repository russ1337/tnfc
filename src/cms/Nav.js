import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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

        <ListItem button key={"Home"}>
          <ListItemText primary={<Link to="/">Home</Link>} />
        </ListItem>
        <ListItem button key={"About Us"}>
          <ListItemText primary={<Link to="/aboutus">About Us</Link>} />
        </ListItem>
        <ListItem button key={"Our Impact"}>
          <ListItemText primary={"Our Impact"} />
        </ListItem>
        <ListItem button key={"Programs"}>
          <ListItemText primary={<Link to="/programs">Programs</Link>} />
        </ListItem>
        <ListItem button key={"News"}>
          <ListItemText primary={<Link to="/cms/news">News</Link>} />
        </ListItem>
        <ListItem button key={"Get Involved!"}>
          <ListItemText primary={<Link className={classes.involvedLink} to="/getinvolved">Get Involved!</Link>} />
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
