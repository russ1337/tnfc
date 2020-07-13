import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Staff from './Staff';
import ContentPage from './ContentPage';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

export default function AboutTab() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} className={classes.aboutTabs}
                      classes={{indicator: classes.aboutIndicator}} centered>
                    <Tab label="Leadership & Board" {...a11yProps(0)} />
                    <Tab label="History & Future Works" {...a11yProps(1)} />
                    <Tab label="Our Partners" {...a11yProps(2)} />
                    <Tab label="Transparency" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Staff/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ContentPage pageId={"5f064a22ce74e3aaba447385"}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ContentPage pageId={"5f07ae0473c7fd074b84bcc5"}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ContentPage pageId={"5f07ae4673c7fd074b84bcc6"}/>
            </TabPanel>
        </div>
    );
}
