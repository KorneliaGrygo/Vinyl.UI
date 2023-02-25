import { Button, Container, Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { handleGetOrderDetailsByOrderIdAndUserId } from '../hooks/RequestHandlers';
import useAuthContext from '../hooks/useAuthContext';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import OrderItemList from './OrderItemList';
import { Link } from 'react-router-dom';
const devliveryCost = 10.99;
const useStyles = makeStyles((e) => {
    return {
        paperBoard: {
            width: '80%',
            marginTop: '30px',
            height: '500px'
        },
        buttonAsOrderState: {
            marginTop: '10px',
            width: '80%',
            height: '60px',
            color: 'black'
        },
        title: {
            marginTop: "15px",
        },
        divider: {
            marginTop: '10px',
            width: "100%",
            marginLeft: '-100px'
        },
        delivery: {
            height: "35px",
            padding: '3px',
            width: "80%",
            marginTop: '5px'
        },
        containerForOrderDetails: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            width: '80%',

        },
        chilfOfOrderDetails: {
            width: " 440px",
            height: "110px",
            padding: '20px',

        },
        titleOfDetails: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            marginLeft: '25px',
            marginTop: '15px',
            marginBottom: '5px'
        },
        fontForAddressDetails: {
            fontSize: '18px'
        },
        payicon: {
            height: '28px',
            width: '28px',
            margin: "2px 2px 2px"
        },
        invoice: {
            width: '80%',
            height: '140px',
            padding: '25px'
        },
        orderItemsDiv: {
            width: "83%",
            maxHeight: '400px',
            overflow: "scroll",
            overflowY: true,
            padding: '10px',
            marginBottom: '150px'
        },
        summary: {
            marginLeft: '25px',
            height: '100px',
            padding: '10px',
            marginTop: '-130px'
        }

    }
})

export default function OrderDetails() {

    const classes = useStyles();
    const { user } = useAuthContext();
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState();
    const handleGetOrderDetails = async () => {
        const order = await handleGetOrderDetailsByOrderIdAndUserId(orderId, user?.id);
        if (order) {
            setOrderDetails(order)
        }
    }
    useEffect(() => {
        handleGetOrderDetails();
    }, [orderId, user])
    return (
        <>
            {orderDetails &&
                <Container className={classes.paperBoard}>
                    <Button variant='outlined' className={classes.buttonAsOrderState} >
                        {orderDetails.orderState}
                    </Button>
                    <Typography variant='h4' className={classes.title}>
                        Nr zamówienia: {orderDetails.generatedOrderId}
                    </Typography>
                    <Typography variant='subtitle1' >
                        Złożone  {orderDetails.orderDate}
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="h5" style={{
                        marginTop: '10px'
                    }}>
                        Dostawa
                    </Typography>
                    <Paper className={classes.delivery}>
                        <Typography>
                            <CardGiftcardIcon style={{
                                marginTop: '5px',
                                marginBottom: "-6px"
                            }} />  Kurier (płatne przy odbiorze)
                        </Typography>
                    </Paper>
                    <div className={classes.titleOfDetails}>
                        <Typography variant='h6'>
                            Adres Dostawy
                        </Typography>
                        <Typography variant='h6' style={{
                            marginLeft: '480px'
                        }}>
                            Dane Odbiorcy
                        </Typography>

                    </div>
                    <div className={classes.containerForOrderDetails}>
                        <Paper className={classes.chilfOfOrderDetails}>
                            <Typography variant='subtitle2' className={classes.fontForAddressDetails}>
                                {orderDetails.orderDetails.address}
                            </Typography>
                            <Typography variant='subtitle2' className={classes.fontForAddressDetails}>
                                {orderDetails.orderDetails.town} {orderDetails.orderDetails.zipCode}
                            </Typography>
                            <Typography variant='subtitle2' className={classes.fontForAddressDetails}>
                                Komentarz do zamówienia: {!orderDetails.orderDetails.comments.lenght ?
                                    orderDetails.orderDetails.comments : "Brak"}
                            </Typography>
                        </Paper>
                        <Paper className={classes.chilfOfOrderDetails} style={{
                            marginLeft: '250px'
                        }}>
                            <Typography variant='subtitle2' className={classes.fontForAddressDetails}>
                                {orderDetails.orderDetails.nameAndSurrName}
                            </Typography>
                            <Typography variant='subtitle1' className={classes.fontForAddressDetails}>
                                tel: {orderDetails.orderDetails.phone}
                            </Typography>
                            <Typography variant='subtitle1' className={classes.fontForAddressDetails}>
                                email: {orderDetails.orderDetails.email}
                            </Typography>
                        </Paper>
                    </div>
                    <Typography variant="h5" style={{
                        marginTop: '10px'
                    }}>
                        Płatność
                    </Typography>
                    <Paper className={classes.delivery}>
                        <img src="/pay.png" className={classes.payicon} />
                        <Typography style={{
                            marginTop: "-30px",
                            marginLeft: '50px'
                        }}>
                            Płatność przy odbiorze
                        </Typography>
                    </Paper>
                    <Typography variant="h5" style={{
                        marginTop: '10px'
                    }}>
                        Dane do faktury
                    </Typography>
                    <Paper className={classes.invoice}>
                        <Typography variant='subtitle2' className={classes.fontForAddressDetails}>
                            {orderDetails.orderDetails.nameAndSurrName}
                        </Typography>
                        <Typography variant='subtitle1' className={classes.fontForAddressDetails}>
                            {orderDetails.orderDetails.address}
                        </Typography>
                        <Typography variant='subtitle1' className={classes.fontForAddressDetails}>
                            {orderDetails.orderDetails.town} {orderDetails.orderDetails.zipCode}
                        </Typography>
                        <Button variant='outlined' size='medium' style={{
                            marginTop: '5px'
                        }}
                            startIcon={<PictureAsPdfIcon />}
                        >
                            Pobierz fakture w formie PDF
                        </Button>
                    </Paper>
                    <Typography variant="h5" style={{
                        marginTop: '10px',
                        marginBottom: "10px"
                    }}>
                        Zamówienie
                    </Typography>
                    <Paper className={classes.orderItemsDiv}>
                        <OrderItemList items={orderDetails.albums} sum={orderDetails.sum} />
                    </Paper>
                    <Paper className={classes.summary}>
                        <Typography variant='subtitle2' style={{
                            fontSize: '18px'
                        }}>
                            Wartość zamówienia: {orderDetails.sum} zł.
                        </Typography>
                        <Typography variant='subtitle2' style={{
                            fontSize: '18px'
                        }}>
                            Koszt dostawy: {devliveryCost} zł.
                        </Typography>
                        <Typography variant='subtitle1' style={{
                            fontSize: '20px'
                        }}>
                            Do zapłaty: {(Number(orderDetails.sum) + devliveryCost).toFixed(2)} zł.
                        </Typography>
                    </Paper>
                    <br></br>
                </Container>
            }
            {!orderDetails &&
                <Typography style={{ marginLeft: '55px', marginTop: "25px" }} variant="h5">
                    Zamówienie o id: {orderId} nie istnieje. Przez do strony z listą zamówień.  <Link to={"/orders"}>
                        Kliknij tutaj.</Link>
                </Typography>
            }
        </>
    )
}







