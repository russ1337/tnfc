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


const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    menuicon: {
        color: '#ffbd45',
        [theme.breakpoints.up('lg')]: {
            display: 'none !important',
        },
    },
    imgHide: {
        [theme.breakpoints.up('lg')]: {
            display: 'none !important',
        },
        height: '60px',
    },
    fullnav: {
        width: '100%',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
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
            <ListItem button onClick={()=> window.location.href = '/'} key={"Root"}>
                <ListItemText><img className={classes.navLogo} src={Logo}/></ListItemText>
            </ListItem>
            <ListItem button onClick={()=> window.location.href = '/'} key={"Home"}>
                <ListItemText primary={'Home'}/>
            </ListItem>
            <ListItem button onClick={()=> window.location.href = '/aboutus'} key={"About Us"}>
                <ListItemText primary={'About Us'}/>
            </ListItem>
            <ListItem button onClick={()=> window.location.href = '/'} key={"Our Impact"}>
                <ListItemText primary={"Our Impact"}/>
            </ListItem>
            <ListItem button onClick={()=> window.location.href = '/programs'} key={"Programs"}>
                <ListItemText primary={'Programs'}/>
            </ListItem>
            <ListItem button onClick={()=> window.location.href = '/news'} key={"News"}>
                <ListItemText primary={'News'}/>
            </ListItem>
            <ListItem button onClick={()=> window.location.href = '/getinvolved'} key={"Get Involved!"}>
                <ListItemText className={classes.involvedLink} primary={'Get Involved!'}/>
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
                <img className={classes.imgHide} src={Logo}/>
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
