import Avatar from "@material-ui/core/Avatar";
import { makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
const dz = 240;

const useStyles = makeStyles({
    avatar:{
        width:"150px",
        height:"150px",
        border:"2px solid black",
        '&:hover':{
            cursor:"pointer"
        }
    },
    albumsDiv:{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
    },
    gridChildElement: { 
        margin: "5px", 
    },
    details:{
        display:"grid",
        gridTemplateColumns: "1fr 1fr",
        marginTop:"10px",
        border: "1px solid black",
        
    },
    albumInfo:{
        marginLeft:'-120px',
        marginTop:"5px",
        height:"250px",
        maxHeight:"500px"
    }
})

export default function Albums({albums}) {
    const classes = useStyles();
    const history = useHistory();
  return (
    <div className={classes.albumsDiv}>
        { albums && albums.map(album => ( 
            <div key={album.id} className={classes.gridChildElement}>
                <div className={classes.details}>
                    <Avatar
                        src={album.avatarUrl ?? "/flower.jpg"}
                        variant="square"
                        className={classes.avatar}
                        style={{
                            marginLeft:"5px",
                            marginTop:"5px"
                        }}
                        onClick={()=>history.push(`/albums/details/${album.id}`)}
                    />
                    <div className={classes.albumInfo}>
                    <Typography 
                    >
                       <strong> Nazwa Albumu: </strong> {album.name}
                    </Typography>
                    <Typography 
                    >
                       <strong> Data wydania: </strong> {album.releaseDate}
                    </Typography>
                    <Typography 
                    >
                       <strong> O Albumie: </strong>  {`${album.desc?.slice(0,425)} ${album.desc?.length > 425 ? "..." : null}`}
                    </Typography>
                    </div>
                </div>
            </div>
            ))}
    </div>
  )
}
