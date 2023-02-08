import { Avatar, Button, Divider, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
const devliveryCost = 10.99;
const useStyles = makeStyles((e) => {
    return {
        container: {
            width: "98%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            marginBottom:"15px",
            height: '65px'
        },
        avatar: {
            width: '50px',
            height: '50px'
        },
    }
})
export default function OrderItemList(props) {

    const classes = useStyles();
    return (
        <>
            {props.items && props.items.map(item => (
                <Paper className={classes.container}>
                    <Avatar
                        src={`/${item.avatar}` ?? '/album.png'}
                        variant="square"
                        style={{
                            padding: '10px'
                        }}
                        className={classes.avatar}
                    />
                    <div style={{
                        marginTop: '7px',
                        marginLeft: '10px',
                        width: '400px'
                    }}>
                        <Typography>
                            {item.name}
                        </Typography>
                        <Typography>
                            {item.band}
                        </Typography>
                    </div>
                    <Button disabled variant="outlined" style={{
                        marginLeft: '20px',
                        marginTop: '10px',
                        marginBottom: '5px',
                        width: '90px',
                        textTransform: 'none'
                    }}
                        size='small'
                    >
                        <Typography variant='subtitle1' >
                            {item.amount} szt.
                        </Typography>
                    </Button>
                    <Typography variant='subtitle1' style={{
                        marginLeft:'300px',
                        marginTop:'17px'
                    }} >
                            {item.price} zł. 
                    </Typography>
                </Paper>
            ))}
            <Divider/>

        </>
    )
}
