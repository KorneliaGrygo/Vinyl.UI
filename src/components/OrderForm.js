import { Divider, FormControl, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'

const useStyles = makeStyles(() => {
    return {
        paper: {
            marginTop: "50px",
            width: "Calc(100% - 640px)",
            marginLeft: "190px",
            border: '1px solid lightgray',
            height: '500px'
        },
        title: {
            marginTop: '50px',
            textAlign: 'center',
            marginRight: '330px',
            marginBottom: "-30px"
        },
        leftSizeForm: {
            marginLeft: '50px',
            marginTop: '15px',
        },
        inputField: {
            width:"450px",
            marginTop:'13px',
            marginBottom:'5px'
        }
    }
})

export default function OrderForm() {
    
    const [nameAndSurrName, setNameAndSurrName] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [town, setTown] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(false);
    const [comments, setComments] = useState('');
    const [statute, setStatute] = useState(false);
    const [newsletter, setNewSletter] = useState(false);

    const classes = useStyles();
    return (
        <>
            <Typography
                className={classes.title}
                variant="h4"
            >
                Dane zamawiającego
            </Typography>
            <Grid container={true} md={2} columnSpacing={2}>
                <Paper className={classes.paper}>
                    <div className={classes.leftSizeForm}>

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Imię i Nazwisko'
                            placeholder='Wprowadź imię i nazwisko'
                        />

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Ulica i numer'
                            placeholder='Wprowadź ulice i numer'
                        />

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Kod pocztowy'
                            placeholder='Wprowadź kod pocztowy'
                        />

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Miejscowość'
                            placeholder='Wprowadź miejscowość'
                        />

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Telefon'
                            placeholder='Wprowadź telefon'
                        />

                       
                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='E-mail'
                            placeholder='Wprowadź e-mail'
                        />

                      
              
          

                    </div>
                </Paper>

            </Grid>

        </>
    )
}
