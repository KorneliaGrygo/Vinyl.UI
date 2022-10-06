import React from 'react'
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

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
    <div>
      
    <Typography variant='h6' >
      Podsumowanie
      <div className={classes.summaryBox}>
        <Typography style={{ fontSize: 25 }}>
          Łączna kwota: {sum} zł.
        </Typography>
        <button>Kupuje</button>
      </div>
    </Typography>

    </div>
  )
}
