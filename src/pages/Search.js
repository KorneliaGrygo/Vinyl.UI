import React, { useState, useEffect } from 'react'
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
import { handleSearchResults } from '../hooks/useAxios';
import Divider from '@material-ui/core/Divider'
import SearchResult from '../components/SearchResult'

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

export default function Search() {
  const classes = useStyles()
  const [phrase, setPhrase] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('albums');
  const [searchResult, setSearchResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await handleSearchResults(category, phrase);
    if(data.length){
        setSearchResult(data);
    }
  }


  return (
    <Container>

      <Typography className={classes.title} variant="h6" component="h2" gutterBottom color="textSecondary" align="center" >
        Wyszukaj album lub profil
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>

        <TextField
          onChange={(e) => setPhrase(e.target.value)}
          className={classes.field}
          color="secondary"
          label="Wyszukaj"
          variant='outlined'
          fullWidth
          required
          error={titleError}
          placeholder="Co chcesz wyszukać?"
        />

        <FormControl className={classes.field}>
          <FormLabel> Wybierz jedną z opcji: </FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <div className={classes.radio}>
              <FormControlLabel value="albums" control={<Radio />} label="Album" />
              <FormControlLabel value="users" control={<Radio />} label="Profil" />
            </div>
          </RadioGroup>
        </FormControl>
        <br />
        <div></div>
        <div
          style={{
            textAlign: 'center',
            marginTop: '-20px'
          }}>
          <Button
            variant="outlined"
            size="large"
            style={{ textAlign: "center" }}
            startIcon={<SearchIcon />}
            type="submit"
          >
            Wyszukaj
          </Button>
        </div>
      </form>
      <br />
      <Divider fullWidth/>
      <div style={{
        marginTop:"10px"
      }}>
          { searchResult && (
            <>
            <SearchResult data={searchResult} category = {category}>

            </SearchResult>
            </>
          )}
      </div>
    </Container>
  )
}
