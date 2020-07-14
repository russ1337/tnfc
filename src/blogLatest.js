import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    subHead: {
        fontSize: '16px',
    },
    readButton: {
        color: '#eb875a',
    },
    flexAdjust: {
        [theme.breakpoints.down('md')]: {
            flexDirection: 'row',
            display: 'inline-flex',
        },

    }
}));

export default function BlogLatest() {


    const classes = useStyles();
    const [data, setData] = useState([]);

    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    };

    useEffect(() => {
        fetch('//'+window.location.hostname+':3500/api/blog/posts?page=1&per_page=4', requestOptions)
            .then((result) => result.json())
            .then(
                (result) => result.map((item) => item.title ? setData(result) : null)
            )
    }, []);


    return (
        <List className={classes.flexAdjust}>

            {
                data.map((item) => item.title ? <Item item={item}/> : null)
            }
        </List>
    );
}


function Item(props) {
    const classes = useStyles();
    const handleClick = (event) => {
        window.location.href = '/news/' + props.item._id.$oid
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
            <Divider variant="inset" component="li"/>
        </>
    )
}
