import { makeStyles } from '@material-ui/core'
import { useState } from 'react';



const useStyles = makeStyles(theme => {
    return {
        kwadrat:{
            width:"500px"
        }
    }
})

export default function Coiajda() {
    const classes = useStyles();
    const [isDisabled, setIsDisabled] = useState()

  return (
    <div className={classes.kwadrat}>
        

    </div>
  )
}
