import { Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, Paper, TextField, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { validate } from 'react-email-validator';

const useStyles = makeStyles(() => {
    return {
        paper: {
            marginTop: "50px",
            width: "Calc(100% - 480px)",
            marginLeft: "120px",
            border: '1px solid lightgray',
            height: '600px',
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
            marginTop: "-440px"
        },
        checkbox: {
            width: '750px'
        },
        orderButton: {
            marginLeft: '50px',
            marginTop: '70px',
            height: '100px',
            width: '350px',
            fontSize: "25px",
            fontWeight: '400'
        },
        errorText:{
            width:"400px",
        }
    }
})

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function OrderForm({handleRealizeOrder}) {

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
    const [addressError, setAddressError] = useState('')
    const [zipCodeError, setZipCodeError] = useState('')
    const [townError, setTownError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [emailError, setEmailError] = useState('');


    const handleAddOrder = async () =>{
        
        await handleRealizeOrder({
            nameAndSurrName,
            address,
            zipCode,
            town,
            email,
            phone,
            comments,
        });
    }


    const isThereAnyErrorLeft = ( ) =>{
        return !(nameError || addressError || zipCodeError || townError || phoneError || emailError)
    }

    const validateEmail = async () => {
        if (!validate(email)) {
            setEmailError("Podany adres email jest nieprawidłowy!")
        } else {
            setEmailError("")
        }
    }

    const validateNameAndSurname = () => {
        if(nameAndSurrName.length < 3){
            setNameError("Imię i nazwisko powinno mieć przynajmniej 3 znaki.")
        }else{
            setNameError('')
        }
    }
    const validateAddress = () => {
        if(address.length < 3){
            setAddressError("Ulica i numer powinna mieć przynajmniej 3 znaki.")
        }else{
            setAddressError('')
        }
    }
    const validateZipCode = () => {
        if(zipCode.length !== 6){
            setZipCodeError("Kod pocztowy musi składać się z 6 znaków.")
        }else{
            setZipCodeError('')
        }
    }
    const validateTown = () => {
        if(town.length === 0){
            setTownError("Te pole nie może być puste.")
        }else{
            setTownError('')
        }
    }
    const validatePhone = () => {
        if(phone.length === 0){
            setPhoneError("Te pole nie może być puste.")
        }else{
            setPhoneError('')
        }
    }

    useEffect(() => {
        if (nameAndSurrName &&
            address &&
            zipCode &&
            town &&
            email &&
            phone &&
            statute && isThereAnyErrorLeft()) {

            setDisabled(false)
        }else{
            setDisabled(true)
        }

    }, [nameAndSurrName, address, zipCode,town, email, phone, statute,
        nameError, addressError, zipCodeError, emailError, phoneError
    ])

    const classes = useStyles();
    return (
        <>
            <Typography
                className={classes.title}
                variant="h4"
            >
                Dane zamawiającego
            </Typography>
            <Paper className={classes.paper}>

            <Grid container={true} md={2} columnSpacing={2}>
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
                            onBlur={() => validateAddress()}
                            error={addressError}
                        />
                        {addressError && <div className={classes.errorText}> <Typography  variant='p1' color="error"> {addressError}</Typography> </div>}

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Kod pocztowy'
                            placeholder='Wprowadź kod pocztowy'
                            value={zipCode}
                            required
                            onChange={(e) => setZipCode(e.target.value)}
                            onBlur={() => validateZipCode()}
                            error={zipCodeError}
                        />
                        {zipCodeError && <div className={classes.errorText}> <Typography  variant='p1' color="error"> {zipCodeError}</Typography> </div>}

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Miejscowość'
                            placeholder='Wprowadź miejscowość'
                            required
                            value={town}
                            onChange={(e) => setTown(e.target.value)}
                            onBlur={() => validateTown()}
                            error={townError}
                        />
                        {townError && <div className={classes.errorText}> <Typography  variant='p1' color="error"> {townError}</Typography> </div>}

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Telefon'
                            placeholder='Wprowadź telefon'
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={() => validatePhone()}
                            error={phoneError}
                        />
                        {phoneError && <div className={classes.errorText}> <Typography  variant='p1' color="error"> {phoneError}</Typography> </div>}

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='E-mail'
                            placeholder='Wprowadź e-mail'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateEmail}
                            error={emailError}
                        />
                        {emailError && <div className={classes.errorText}> <Typography  variant='p1' color="error"> {emailError}</Typography> </div>}
                    </div>
                    <Divider orientation="vertical" className={classes.divider} />
                    <div className={classes.rightSideForm}>
                        <TextField
                            className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Dodatkowe informacje'
                            placeholder='Wprowadź dodatkowe informację dotyczące zamówienia'
                            multiline
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                        <Tooltip
                            title="Chwilowo dostępna jest jedynie płatność przy odbiorze."
                            arrow
                            placement='top-start'
                        >
                            <FormControlLabel
                                className={classes.checkbox}
                                control={<Checkbox
                                    {...label}
                                    color="secondary"
                                    checked={paymentMethod}
                                    disabled
                                />}
                                label="Płatność przy odbiorze *"
                            />
                        </Tooltip>

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
                            marginBottom: '10px',
                            marginLeft: '30px',
                            width: '500px'
                        }}>
                            Akceptuje <Link>regulamin</Link> sklepu *
                        </Typography>

                        <div>
                        <FormControlLabel
                            className={classes.checkbox}
                            control={<Checkbox
                                {...label}
                                color="secondary"
                                checked={newsletter}
                                onChange={() => setNewSletter(prev => !prev)}
                                />}
                                label="Chcę otrzymywać Newsletter"
                        />
                        </div>

                        <Button
                        className={classes.orderButton}
                        size="medium"
                        variant='outlined'
                        disabled={disabled}
                        onClick={handleAddOrder}
                    > Złóż zamówienie
                    </Button>
                    </div>
                </Grid>
            </Paper>
        </>
    )
}
