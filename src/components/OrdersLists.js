import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useState } from 'react';
import useAuthContext from '../hooks/useAuthContext'
import {handleGetOrderList} from '../hooks/useAxios'


const useStyles = makeStyles((e) => {
    return {
        contaier:{
            border:'1px solid lightgray',
            marginTop:'50px',
            borderRadius: '5px',
            overflowY:true,
            height:"500px",
            maxHeight:'800px',
            padding:'10px'
        },
        orderWrapper:{
            marginBottom:"5px",
            border:'1px solid lightgray', 
            padding:'15px',
            
        },

    }
})

export default function OrdersLists() {
    const classes = useStyles()
    const {user} = useAuthContext();
    const [orders, setOrders] = useState([])

    const handleGetOrders = async () => {
        if(user){
            const data = await handleGetOrderList(user?.id);
            if(data){
                setOrders(data);
            }
        }
    }

    useEffect(() => {
        handleGetOrders();
    }, [user])
    

  return (
    
    <Container>
        <Paper className={classes.contaier}>

        {orders && orders.map(order => (
            <Grid key={order.id} className={classes.orderWrapper}>
                <div>
                <Typography>
                    Nr zamówienia: {order.generatedOrderId}
                </Typography>
                </div>
                <div>
                    
                </div>
            </Grid>
        ))}
        </Paper>

    </Container>
  )
}
