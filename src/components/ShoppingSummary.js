import React from 'react'
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { Button, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    summaryBox: {
      border: '1px solid',
      borderColor: "lightgray",
      borderRadius: '5px',
      height: "100px",
      width: '80%',
      marginTop: '10px',
      grid: 'flex'
    }

  }
})

export default function ShoppingSummary({sum}) {
  const classes = useStyles();
  return (
    <div style={{
      width: "Calc(100% - 480px)",
      marginTop:'25px',
      marginLeft:'125px'
    }}>
    
      <Typography
        variant='h4'
        style={{
          marginLeft:'450px',
          marginTop:'50px'
        }}
      > Podsumowanie
      </Typography>

    <Paper>
        <Typography
          variant='h4'
          style={{
            marginLeft:'450px',
            marginTop:'50px'
          }}
        > Łączna kwota: {sum} zł.
        </Typography>
        <Button variant="outlined" style={{
          marginLeft:'500px',
          marginTop:'50px',
          marginBottom: '50px'
        }}> Wprowadź dane do zamówienia </Button>
    </Paper>
    </div>
  )
}
