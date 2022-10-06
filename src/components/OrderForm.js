import { Divider, FormControl, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React from 'react'

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
                            placeholder='Wprowadź imię i nazwisko'
                        />

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Imię i Nazwisko'
                            placeholder='Wprowadź imię i nazwisko'
                        />

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Imię i Nazwisko'
                            placeholder='Wprowadź imię i nazwisko'
                        />

                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Imię i Nazwisko'
                            placeholder='Wprowadź imię i nazwisko'
                        />

                       
                        <TextField className={classes.inputField}
                            variant='outlined'
                            color="secondary"
                            label='Imię i Nazwisko'
                            placeholder='Wprowadź imię i nazwisko'
                        />

                      
              
          

                    </div>
                </Paper>

            </Grid>

        </>
    )
}
