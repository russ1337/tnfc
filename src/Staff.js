import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import useAxios from 'axios-hooks'
import MUIRichTextEditor from "mui-rte";
import Button from '@material-ui/core/Button';
import AnimateHeight from 'react-animate-height';

function Staff(props) {
    const staffStyles = makeStyles((theme) => ({
        homeH2Main: {
            color: '#eb875a',
            textAlign: 'center',
        },
    }));
    const classes = staffStyles();
    const [{data, loading, error}, refetch] = useAxios(
        '//'+window.location.hostname+':3500/api/staff'
    )

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    return (

        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <h2 className={classes.homeH2Main}>Leadership & Board</h2>
                </Grid>
                {
                    data.map(item => <Item item={item}/>)
                }
            </Grid>
        </Container>
    )


}

function Item(props) {
    const useStyles = makeStyles((theme) => ({
        profilePic: {
            borderRadius: '50%',
            height: '300px',
            width: '300px',
            margin: '30px auto',
        },
        profileCard: {
            background: 'linear-gradient(180deg, #eb875a 50%, #6aa6b6 50%);',
        },
        profileContent: {
            padding: '20px 50px',
        },
        contactIcon: {
            color: '#000000',
            backgroundColor: '#6aa6b6',
        },
        titleText: {
            fontSize: '18px',
            color: '#eb875a',
        },
        homeH2Main: {
            color: '#eb875a',
            textAlign: 'center',
        },
        truncateCard: {
            height: '300px',
            padding: '0 !import',
        },
        cardAction: {
            background: '#fff',
        }
    }));
    const classes = useStyles();
    const [height, setHeight] = useState(200)

    const toggle = () => {

        setHeight(height === 200 ? 'auto' : 200);
    };
    return (
        <Grid item xs={12} md={6} lg={4} >
            <Card className={classes.profileCard}>
                <CardMedia
                    square
                    className={classes.profilePic}
                    image={'//'+window.location.hostname+':3500/api/staff/pic/' + props.item._id.$oid}
                    title={props.item.name}
                >
                </CardMedia>
                <CardContent>
                    <Card className={classes.profileContent}>
                        <AnimateHeight
                            duration={ 500 }
                            height={ height }
                            className={classes.truncateCard}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.item.name} <Typography className={classes.titleText}
                                                              component="span">{props.item.degree}</Typography>
                            </Typography>
                            <Typography gutterBottom variant="h5" className={classes.titleText} component="h2">
                                {props.item.title}
                            </Typography>
                            <Divider/>
                            <MUIRichTextEditor
                                className={classes.articleBody}
                                defaultValue={props.item.description}
                                readOnly={true}
                                toolbar={false}
                            />
                        </AnimateHeight>
                        <CardActions className={classes.cardAction}>
                            <Button size="small" color="primary" onClick={ toggle }>
                                { height === 200 ? 'Read More' : 'Read Less' }
                            </Button>
                        </CardActions>
                    </Card>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Staff;
