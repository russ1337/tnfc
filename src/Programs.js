import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Nav from './Nav';
import ProgramForm from './ProgramForm';
import {makeStyles} from '@material-ui/core/styles';
import Image from './img/pic5.jpg'; // Import using relative path
import Chart from './img/transition-chart.jpg'; // Import using relative path

const useStyles = makeStyles((theme) => ({
    programHeader: {
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        height: "500px",
        backgroundPosition: "center center",
        position: 'relative',
    },
    programBg: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: '-100',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        boxSizing: 'border-box',
        paddingTop: '200px',
    },
    pBody: {
        '& p': {
            fontSize: '1.1em',
        }
    },
    orangeText: {
        fontSize: '1.4em',
        color: '#eb875a',
        fontWeight: '600',
    },
    p1: {
        fontSize: '1.2em !important',
        fontWeight: '500',
    },
    programImage: {
        float: 'right',
        width: '400px',
        padding: '20px',
        [theme.breakpoints.down('md')]: {
            float: 'none !important',
            margin: '0 auto',
        },
    }
}));

export default function Program() {
    const classes = useStyles();
    return (

        <Container className={classes.pBody} maxWidth="md">
            <br/>
            <br/>
            <span className={classes.orangeText}>The Bridge – Our Model For Success</span>
            <br/>
            <img className={classes.programImage} alt={"chart"} src={Chart}/>
            <p className={classes.p1}>Through The Bridge program, TNFC delivers barrier-free access to transition
                services. It works to provide multisystemic support with the recognition that
                young people with experience in foster care encounter barriers requiring an
                individualized approach in order to successfully transition to independence. </p>

            <p>The Bridge incorporates TIP as an evidence-based model to assist youth in
                developing a sustainable plan for their future success along five identified
                Transition Domains. The young person is taken through Strength Discovery and
                Needs Assessment exercises to help them self-identify areas of focus. </p>

            <p>The Bridge incorporates TIP as an evidence-based model to assist youth in
                developing a sustainable plan for their future success along five identified
                Transition Domains. The young person is taken through Strength Discovery and
                Needs Assessment exercises to help them self-identify areas of focus. </p>

            <p>
                Community-based teaching is provided by the Navigator through instructing,
                modeling, and practicing of new skills that are applicable to the young person’s goals.
            </p>
            <p>
                The Bridge takes a multisystemic approach by engaging key players in the community to provide additional
                wraparound support.
            </p>
            <p>
                At the community level, TNFC collaborates with Community Mental Health, community
                faith-based organizations, the Michigan Department of Health and Human Services,
                local school districts, and the Fostering Success Michigan (FSM) higher education network.
            </p>
            <p>
                Young people with experience in the foster care system, along with foster care alumni,
                have access to these organizations. The Bridge involves community and foster care alumni
                Mentors to help provide young people with a circle of support as they work to improve
                Transitional Domains and exemplify healthy forms of interdependence.
            </p>
            <p>
                The vision of The Bridge is to bring people and organizations together to create a circle of support for
                young people as they transition out of foster care into a successful future.
            </p>
            <p>
                The Bridge provides direct services and catalyzes supportive relationships for the individual based on
                their age, development, and individual goals.
            </p>
            <p>
                Although this approach is unique to each young person, based on the initial assessment, each young
                person will be accepted into the program level appropriate to his/her stage of development.
            </p>
            <br/>
            <Container maxWidth="sm">
                <ProgramForm/>
            </Container>
        </Container>
    );
}

export function ProgramHead() {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.programHeader}>
            <Nav/>
            <div className={classes.programBg}>
                <Container maxWidth="md">
                    <h1>Programs & Services</h1>
                </Container>
            </div>
        </AppBar>
    )
};
