import React from 'react'
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from "@material-ui/styles"
import { Typography } from '@material-ui/core'
import useAuthContext from '../hooks/useAuthContext'

const useStyles = makeStyles ({
    avatar:{
        width: "100px",
        height: "100px",
        border: "5px"
    },
    parent: {
        padding: "2rem 2rem",
        textAlign: "left",
    },
    child: {
        display: "inline-block",
        verticalAlign: "middle",
        padding: "1rem 1rem",
    },
})

export default function Profile() {
const classes = useStyles();
const { user } = useAuthContext();

  return (
    <div style={{
        width: `Calc(100% - 240px)`
    }}>

        <div className={classes.parent}>
            <div className={classes.child}> 
            <Avatar src="/flower.jpg" className={classes.avatar} />
            </div>
            <div className={classes.child}>
                <Typography variant='h5'>
                Nazwa użytkownika {user.nick} <br />
                <br />
                informacje o użytkowniku
                </Typography>
            </div>
        </div>

    </div>
  )
}