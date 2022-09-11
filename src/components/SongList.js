import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'



const useStyles = makeStyles(theme => {
  return {
    songStyle: {
      padding: "20px",
    },
    songLenght: {
      marginLeft: '15px',
      marginTop: '-10px',
      color:'gray'
    }
  }
})
export default function SongList({ songs }) {

  const classes = useStyles();

  return (
    <>
      {songs && songs.map(song => (
        <div className={classes.songStyle} key={song.id}>

          <Typography
            variant='subtitle1'
            gutterBottom={true}
          >
            {`${song.id}. ${song.name}`}
          </Typography>

          <Typography
            className={classes.songLenght}
            variant='subtitle2'
          >

            {song.length}

          </Typography>
        </div>
      ))}

    </>
  )
}
