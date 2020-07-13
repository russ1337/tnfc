import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from '@material-ui/core/Container';

import Nav from "./Nav";

import PageEdit from "./PageEdit";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function OldStaff() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    };

    useEffect(() => {
// Update the document title using the browser API
        fetch('http://localhost:3500/api/pages', requestOptions)
            .then((result) => result.json())
            .then(
                (result) => result.map(() => setData(result))
            )
    }, []);

    return (
        <Container maxWidth="md">
            <Nav/>
            <div className={classes.root}>
                {
                    data.map((item) => <Item item={item}/>)
                }
            </div>
        </Container>
    );
}

function Item(props) {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classes = useStyles();
    return (
        <ExpansionPanel expanded={expanded === props.item._id.$oid} onChange={handleChange(props.item._id.$oid)}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography className={classes.heading}>{props.item.pageName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {<PageEdit postId={props.item._id.$oid}/>}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}
