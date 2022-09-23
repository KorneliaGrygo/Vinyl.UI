import { Avatar, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const useStyles = makeStyles(theme => {
    return {
      album: {
        padding: "0px",
      },
      albumLenght: {
        marginLeft: '0px',
        marginTop: '0px',
        color:'gray'
      },
      avatar: {
        width: "130px",
        height: "130px",
        border: '1px solid',
        borderColor: "black",
        borderRadius: '5px',
        marginTop: "9px",
        marginLeft: "70px"
      },
      name: {
        textAlign: "center"
      }
    }
  })
export default function FavAlbums({albums}) {
    const classes = useStyles();
    const history = useHistory();
  return (
    <>
    {albums && albums.map(album => (
        <div>
            <div className={classes.albumBox}>
            <Avatar
                className={classes.avatar}
                src={`/${album.avatarUrl}` ?? '/album.png'}
                variant='square'
                onClick={()=> history.push(`/albums/details/${album.id}`)}
            />
            <Typography 
             className={classes.name}
             variant="h6"

            >
                {album.name}
                <br /> 
                {isNaN(new Date(album.releaseDate)?.getFullYear()) ? "" :  new Date(album.releaseDate)?.getFullYear()}
            </Typography>

            </div>
          

        </div>
    ))}
    </>
  )
}
