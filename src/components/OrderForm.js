import { Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, Paper, TextField, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            width: "450px",
            marginTop: '13px',
            marginBottom: '5px'
        },
        divider: {
            marginLeft: "600px",
            color: 'black',
            marginTop: '-440px',
        },
        rightSideForm: {
            marginLeft: "700px",
            marginTop: "-505px"
        },
        checkbox: {
            width: '750px'
        },
        orderButton: {
            marginLeft: '770px',
            marginTop: '50px',
            height: '150px',
            width: '500px',
            fontSize: "40px",
            fontWeight: '400'
        },
        errorText:{
            width:"400px",
        }
    }
})

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function OrderForm() {

    const [nameAndSurrName, setNameAndSurrName] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [town, setTown] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(true);
    const [comments, setComments] = useState('');
    const [statute, setStatute] = useState(false);
    const [newsletter, setNewSletter] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [nameError, setNameError] = useState('')

    const validateNameAndSurname = () => {
        if(nameAndSurrName.length === 0){
            setNameError("Te pole nie może być puste.")
        }else{
            setNameError('')
        }
    }
    

    useEffect(() => {
        debugger;
        if (nameAndSurrName &&
            address &&
            zipCode &&
            town &&
            email &&
            phone &&
            statute) {

            setDisabled(false)
        }else{
            setDisabled(true)
        }

    }, [nameAndSurrName, address, zipCode,town, email, phone, statute])

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
                            required
                            value={nameAndSurrName}
                            onChange={(e) => setNameAndSurrName(e.target.value)}
                            onBlur={() => validateNameAndSurname()}
                            error={nameError}
                        />
                        {nameError && <div className={classes.errorText}> <Typography  variant='p1' color="error"> {nameError}</Typography> </div>}

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Ulica i numer'
                            placeholder='Wprowadź ulice i numer'
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}

                        />

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Kod pocztowy'
                            placeholder='Wprowadź kod pocztowy'
                            value={zipCode}
                            required
                            onChange={(e) => setZipCode(e.target.value)}
                        />

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Miejscowość'
                            placeholder='Wprowadź miejscowość'
                            required
                            value={town}
                            onChange={(e) => setTown(e.target.value)}
                        />

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Telefon'
                            placeholder='Wprowadź telefon'
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='E-mail'
                            placeholder='Wprowadź e-mail'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Divider orientation="vertical" className={classes.divider} />
                    <div className={classes.rightSideForm}>
                        <TextField
                            className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Dodatkowe informacje'
                            placeholder='Wprowadź jakieś dodatkowe informację dotyczące zamówienia'
                            multiline
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                        <Tooltip
                            title="Chwilowo jest tylko dostępna płatność przy odbiorze"
                            arrow
                            placement='top-start'
                        >
                            <FormControlLabel
                                className={classes.checkbox}
                                control={<Checkbox
                                    {...label}
                                    color="secondary"
                                    checked={!paymentMethod}
                                    disabled
                                />}
                                label="Płatność z góry *"
                            />
                        </Tooltip>


                        <div>
                        <FormControlLabel
                            className={classes.checkbox}
                            control={<Checkbox
                                {...label}
                                color="secondary"
                                checked={newsletter}
                                onChange={() => setNewSletter(prev => !prev)}
                                />}
                                label="Czy chcesz otrzymywać cotygodniowy Newsletter z informacjami o nowych albumach?"
                        />
                        </div>


                        <FormControlLabel
                            className={classes.checkbox}
                            control={<Checkbox
                                {...label}
                                color="secondary"
                                checked={statute}
                                onChange={() => setStatute(prev => !prev)}
                            />}
                        />
                        <Typography style={{
                            marginTop: "-35px",
                            marginLeft: '30px',
                            width: '500px'
                        }}>
                            Akceptuje <Link>regulamin</Link> sklepu *
                        </Typography>
                    </div>
                    <Button
                        className={classes.orderButton}
                        size='large'
                        variant='outlined'
                        disabled={disabled}
                    >
                        Złóż zamówienie
                    </Button>
                </Paper>

            </Grid>

        </>
    )
}
