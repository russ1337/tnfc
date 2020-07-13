import React, {useState} from 'react';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ContactCard from './ContactCard';
import Logo from './img/logo.png';
import {makeStyles} from '@material-ui/core/styles';
import {
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    menuicon: {
        color: '#ffbd45',
        [theme.breakpoints.up('sm')]: {
            display: 'none !important',
        },
    },
    fullnav: {
        width: '100%',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        '& .MuiButtonBase-root': {
            width: 'auto',
            display: 'inline-flex',
            '& a': {
                color: '#e6ffff',
                textDecoration: 'none',
            },
            '& .MuiListItemText-primary': {
                color: '#e6ffff',
                textDecoration: 'none',
            },
        },
    },
    involvedLink: {
        color: '#b3e5fc !important',
        fontWeight: 'bold',
    },
    donateLink: {
        display: 'block',
        color: '#000 !important',
        backgroundColor: '#e6ffff',
        padding: '2px 8px',
        borderRadius: '5px',
    },
    contactLink: {
        display: 'block',
        color: '#000 !important',
        backgroundColor: '#b3e5fc',
        padding: '2px 8px',
        borderRadius: '5px',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    navLogo: {
        height: '60px',
    },
}));

export default function Nav() {
    const [open, setOpen] = React.useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const classes = useStyles();
    const [openContact, setOpenContact] = useState(false);
    const handleClose = () => {
        setOpenContact(false);
    };
    const handleToggle = () => {
        setOpenContact(!openContact);
    };
    const list = anchor => (
        <List>
            <ListItem button key={"Root"}>
                <ListItemText><img className={classes.navLogo} src={Logo}/></ListItemText>
            </ListItem>
            <ListItem button key={"Home"}>
                <ListItemText primary={<Link to="/">Home</Link>}/>
            </ListItem>
            <ListItem button key={"About Us"}>
                <ListItemText primary={<Link to="/aboutus">About Us</Link>}/>
            </ListItem>
            <ListItem button key={"Our Impact"}>
                <ListItemText primary={"Our Impact"}/>
            </ListItem>
            <ListItem button key={"Programs"}>
                <ListItemText primary={<Link to="/programs">Programs</Link>}/>
            </ListItem>
            <ListItem button key={"News"}>
                <ListItemText primary={<Link to="/news">News</Link>}/>
            </ListItem>
            <ListItem button key={"Get Involved!"}>
                <ListItemText primary={<Link className={classes.involvedLink} to="/getinvolved">Get Involved!</Link>}/>
            </ListItem>
            <ListItem button key={"Donate"}>
                <ListItemText primary={<span className={classes.donateLink}>Donate</span>}/>
            </ListItem>
            <ListItem button onClick={handleToggle} key={"Contact"}>
                <ListItemText primary={<span className={classes.contactLink}>Contact</span>}/>
            </ListItem>
        </List>
    );
    return (
        <div>
            {openContact && <ContactCard/>}
            <Toolbar className={classes.navbar} position="static">
                <div role="presentation" className={classes.fullnav}>
                    {list()}
                </div>
                <IconButton
                    color="black"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="end"
                    className={classes.menuicon}
                >
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
            <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
                <div>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronRightIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <div role="presentation">
                    {list()}
                </div>
            </Drawer>
        </div>
    );
}
