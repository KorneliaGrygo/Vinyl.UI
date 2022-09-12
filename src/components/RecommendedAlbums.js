import { Avatar, makeStyles, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const useStyles = makeStyles (theme => {
    return {
        recommendedBox: {
            marginLeft: "460px",
            marginTop:"-357px",
            border: '1px solid',
            borderColor: "lightgray",
            borderRadius: '5px',
            width:"455px",
            gridColumnStart:"2",
            gridColumnEnd:"3",
            overflowY: "auto",
        },
        albumBox: {
            width: "400px",
            height: "150px",
            border: '1px solid',
            borderColor: "lightgray",
            borderRadius: '5px',
            marginTop: "10px",
            marginLeft: "10px"
        },
        avatar: {
            width: "130px",
            height: "130px",
            border: '1px solid',
            borderColor: "black",
            borderRadius: '5px',
            marginTop: "9px",
            marginLeft: "10px"
        },
        name: {
            marginLeft: "170px",
            marginTop: "-90px",
        }
    }
})

export default function RecommendedAlbums({bandsAlbums}) {
    const classes = useStyles();
    const history = useHistory();

  return (
    <div className={classes.recommendedBox}>
        <Typography 
            variant="h5"
            style={{
                textAlign:'center'
            }}
        >
            Inne albumy tego wykonawcy: 
        </Typography>
        
        {bandsAlbums && bandsAlbums.map(album => (
            <div className={classes.albumBox}>
            <Avatar
                className={classes.avatar}
                src={album.avatarUrl ?? '/album.png'}
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
        ))}
    </div>
  )

}
