import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Nav from './Nav';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Image from './img/pic3.jpg'; // Import using relative path
import VolunteerCard from './VolunteerCard';
import Pagination from '@material-ui/lab/Pagination';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  subHead: {
    fontSize: '16px',
  },
  readButton: {
    color: '#eb875a',
  },
}));

export default function BlogLatest() {


const classes = useStyles();
const [data, setData] = useState([]);

const requestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify()
};

useEffect(() => {
fetch('http://localhost:3500/api/blog/posts?page=1&per_page=4', requestOptions)
.then((result) => result.json())
.then(
  (result) => result.map( (item) => item.title ?  setData(result) : null )
)
},[]);





  return (
<List className={classes.root}>

        {
          data.map( (item) => item.title ? <Item item={ item } /> : null )
        }
   </List>
  );
}


function Item(props) {
  let { path, url } = useRouteMatch();
  const classes = useStyles();
  const handleClick = (event) => {
    window.location.href = '/news/'+props.item._id.$oid
  };
    return (
      <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={props.item.title}
          secondary={
            <React.Fragment>
            {props.item.subTitle}

              <Typography
                component="span"
                 className={classes.subHead}
              ><br/>
              {props.item.date_created}
              </Typography><br/>
              <Button onClick={handleClick} className={classes.readButton}>
                Read
              </Button>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </>
    )
}
