import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {PieChart} from 'react-minimal-pie-chart';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-material-ui-carousel';

function FactCarousel(props) {
    let items = [
        {
            key: 1,
            name: "DID YOU KNOW?",
            description: "25% of Former Foster Children are Diagnosed with PTSD - Twice the Rate of US Veterans",
            photo: "./ptsd-1.jpg",
            statistic: 25
        },
        {
            key: 2,
            name: "DID YOU KNOW?",
            description: "One in Five Foster Youth Will Be Incarcerated By Age 21",
            photo: "./jail-1.jpg",
            statistic: 20
        },
        {
            key: 3,
            name: "DID YOU KNOW?",
            description: "71% of Foster Girls are Pregnant by Age 21",
            photo: "./pregnant-teen-1.jpg",
            statistic: 71
        },
        {
            key: 4,
            name: "DID YOU KNOW?",
            description: "49% of Foster Care Youth Will Graduate High School by Age 19",
            photo: "./school-drop-out-1.jpg",
            statistic: 49
        },
        {
            key: 5,
            name: "DID YOU KNOW?",
            description: "40% of Foster Care Youth That Are 21 Years Old Have Experienced Homelessness in the Past 2 Years",
            photo: "./ptsd-1.jpg",
            statistic: 40
        },
        {
            key: 6,
            name: "DID YOU KNOW?",
            description: "77% of Christians Believe They Should Be Involved in Foster Care, but ONLY 5% are Involved",
            photo: "./mare-1.jpg",
            statistic: 5
        },
    ]

    return (
        <Carousel>
            {
                items.map(item => <Item key={item.key}  item={item}/>)
            }
        </Carousel>
    )
}

function Item(props) {
    const pieValue = 100 - props.item.statistic;
    const useStyles = makeStyles((theme) => ({
        factCarouselCard: {
            backgroundColor: '#ffdd70',

        },
        textIncrease: {
            fontSize: '1.1em',
        },
        factCarousel: {
            position: 'relative',
            height: '300px',

        },
        percent: {
            position: 'absolute',
            color: '#eb875a',
            fontSize: '50px',
            fontWeight: 'bold',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            left: '0',
            display: 'block',
            paddingTop: '110px',
            top: '0',
        },
    }));
    const classes = useStyles();
    return (

        <Card className={classes.factCarouselCard}>
            <CardMedia
                className={classes.factCarousel}
                image={props.item.photo}
                title={props.item.name}
            >
                <PieChart
                    segmentsShift={3}
                    lineWidth={10}
                    paddingAngle={5}
                    center={[50, 60]}
                    viewBoxSize={[100, 120]}
                    rounded

                    data={[
                        {title: '', value: props.item.statistic, color: '#eb875a'},
                        {title: '', value: pieValue, color: '#6aa6b6'},
                    ]}
                />
                <Typography className={classes.percent} component="span">
                    {props.item.statistic + '%'}
                </Typography>
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.item.name}
                </Typography>
                <Typography className={classes.textIncrease} variant="body2" color="textSecondary" component={'p'}>
                    {props.item.description}
                </Typography>
            </CardContent>
        </Card>

    )
}

export default FactCarousel;
