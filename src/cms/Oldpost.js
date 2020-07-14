import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PostEdit from './Postedit';
import Pagination from '@material-ui/lab/Pagination';

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

export default function Oldpost() {
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
        fetch('//'+window.location.hostname+':3500/api/blog/posts?page=' + page + '&per_page=10', requestOptions)
            .then((result) => result.json())
            .then(
                (result) => result.map((item) => item.totalPages ? setPageCount(item.totalPages) : setData(result))
            )
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };


    return (
        <div className={classes.root}>
            {
                data.map((item) => item.title ? <Item item={item}/> : null)
            }
            <Pagination page={page} count={pageCount} onChange={handlePageChange}/>
        </div>
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
                <Typography className={classes.heading}>{props.item.title}</Typography>
                <Typography className={classes.secondaryHeading}>{props.item.subTitle}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <PostEdit postId={props.item._id.$oid}/>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}
