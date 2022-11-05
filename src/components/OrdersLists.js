import { Avatar, Button, Container, Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useAuthContext from '../hooks/useAuthContext'
import { handleGetOrderList } from '../hooks/RequestHandlers'


const useStyles = makeStyles((e) => {
    return {
        contaier: {
            border: '1px solid lightgray',
            marginTop: '50px',
            borderRadius: '5px',
            overflowY: "scroll",
            height: "800px",
            padding: '10px',
            width: '1450px',
            marginLeft: '-250px'
        },
        orderWrapper: {
            marginBottom: "5px",
            border: '1px solid lightgray',
            padding: '15px',
        },
        avatarContainer: {

        },
        avatar: {
            width: '50px',
            height: '50px',
            border: "1px solid black",
            marginTop: '10px',
            marginLeft: '10px',
            marginBottom: '10px',
            display: 'inline-block',
            marginLeft: '40px',
        },
        formControl:{
            marginLeft:'-230px',
            marginTop:'10px',
            marginBottom:'-30px',
            display:'inline-block'
        }

    }
})

export default function OrdersLists() {
    const classes = useStyles()
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([])
    const [sortDir, setSortDir] = useState('asc')
    const [sortBy, setSortBy] = useState('id')
    const history = useHistory();

    const handleGetOrders = async () => {
        if (user) {
            const data = await handleGetOrderList(user?.id, sortDir, sortBy );
            if (data) {
                setOrders(data);
            }
        }
    }
    const handleChangeSortDir = (e) => {
        setSortDir(e.target.value)
    }

    const handleChangeSortBy = (e) => {
        setSortBy(e.target.value)
    }
    useEffect(() => {
        handleGetOrders();
    }, [user, sortDir, sortBy])


    return (

        <Container>
            <FormControl size='small' className={classes.formControl}>
                <InputLabel size='small'>Sortuj:</InputLabel>
                    <Select
                        value={sortDir}
                        onChange={handleChangeSortDir}
                    >
                        <MenuItem value={"desc"}>Rosnąco</MenuItem>
                        <MenuItem value={"asc"}>Malejąco</MenuItem>
                </Select>
                
                <InputLabel style={{marginLeft:'100px', width:'200px'}} size='small'>Po czym sortować:</InputLabel>
                    <Select style={{marginLeft:'35px'}}
                        value={sortBy}
                        onChange={handleChangeSortBy}
                    >
                        <MenuItem value={"id"}>Data</MenuItem>
                        <MenuItem value={"sum"}>Cena</MenuItem>
                </Select>
            </FormControl>

            <Paper className={classes.contaier}>
                {orders && orders.map(order => (
                    <Grid key={order.id} className={classes.orderWrapper}>
                        <div>
                            <Typography variant="subtitle2">
                                Nr zamówienia: {order.generatedOrderId}
                            </Typography >
                            <Divider variant='fullWidth' style={{ marginTop: '5px', background: "lightgray" }} />
                            <Typography variant='subtitle1'>
                                {order.orderDate}
                            </Typography>

                        </div>

                        <div className={classes.avatarContainer}>
                            {order.albums && order.albums.map(album => (
                                <Avatar
                                    className={classes.avatar}
                                    variant='square'
                                    src={album.avatar}
                                />
                            ))}
                        </div>
                        <Divider variant='fullWidth' style={{ marginTop: '5px', background: "lightgray" }} />
                        <div style={{
                            display: 'inline-block',
                            width: '100%'
                        }}>
                            <Typography>
                                Do zapłacenia  {order.sum} zł
                            </Typography>
                            <Button 
                                onClick = {() => history.push(`/order/details/${order.id}`)}
                                variant="outlined" color='secondary' size='small'>
                                {order.orderState}
                            </Button>
                        </div>

                    </Grid>
                ))}
            </Paper>

        </Container>
    )
}
