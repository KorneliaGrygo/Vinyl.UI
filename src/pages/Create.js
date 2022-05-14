import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Container from '@material-ui/core/Container'
import AcUnitOutlinedIcon from '@material-ui/icons/AcUnitOutlined'
import SendIcon from '@material-ui/icons/Send'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { FormControlLabel, makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    textAlign: "center"
  },
  radio: {
    textAlign: "center"

  }
})

export default function Create() {
  const classes = useStyles()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('album')

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (title == '') {
      setTitleError(true)
    }
    if (details == '') {
      setDetailsError(true)
    }
    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'))
    }
  }

  return (
    <Container>

      <Typography className={classes.title} variant="h6" component="h2" gutterBottom color="textSecondary" align="center" >
        Wyszukaj album lub profil
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>

        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          color="secondary"
          label="Wyszukaj"
          variant='outlined'
          fullWidth
          required
          error={titleError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Wyszukaj: </FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <div className={classes.radio}>
              <FormControlLabel value="album" control={<Radio />} label="Album" />
              <FormControlLabel value="profil" control={<Radio />} label="Profil" />
            </div>
          </RadioGroup>
        </FormControl>
        <br />
        <div></div>
        <Button variant="outlined" size="medium" style={{textAlign: "center"}}
          startIcon={<SearchIcon />}>
          Wyszukaj
        </Button>
      </form>
    </Container>
  )
}
