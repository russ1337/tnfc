import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MUIRichTextEditor from "mui-rte";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    aboutTabs: {
        backgroundColor: '#ffdd70',
        color: 'black !important',
    },
    aboutIndicator: {
        backgroundColor: '#eb875a',
    },
    homeH2Main: {
        color: '#eb875a',
        textAlign: 'center',
    },
    pBody: {
        '& p': {
            fontSize: '1.1em',
        }
    }
}));

export default function ContentPage(props) {
    const [state, setState] = useState({
        pageName: '',
        body: ''
    });

    const classes = useStyles();
    const requestOptionsGet = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify()
    };

    useEffect(() => {
        fetch('//'+window.location.hostname+':3500/api/pages/'+props.pageId, requestOptionsGet)
            .then((result) => result.json())
            .then(
                (result) =>
                    setState({
                        ...state,
                        pageName: result.pageName,
                        body: result.body
                    })
            )
    }, []);
    return (

        <Container className={classes.pBody}>
            <h2 className={classes.homeH2Main}>{state.pageName}</h2>
            <MUIRichTextEditor
                className={classes.articleBody}
                defaultValue={state.body}
                readOnly={true}
                toolbar={false}
            />
        </Container>
    );
}
