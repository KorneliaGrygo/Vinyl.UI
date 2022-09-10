import Avatar from "@material-ui/core/Avatar";
import { makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import AlbumIcon from '@material-ui/icons/Album';
import { useEffect } from "react";


const useStyles = makeStyles({
    avatar: {
        width: "150px",
        height: "150px",
        border: "2px solid black",
    },
    albumsDiv: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        maxWidth:'1100px'
    },
    gridChildElement: {
        margin: "5px",
    },
    details: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        marginTop: "10px",
        border: "1px solid black",
        padding:'8px',

    },
    albumInfo: {
        marginLeft: '-90px',
        marginTop: "5px",
        height: "270px",
        maxHeight: "500px"
    },
    profilInfo: {
        marginLeft: '-90px',
        marginTop: "5px",
        height: "200px",
        maxHeight: "500px"
    },
    buttonDetails: {
        marginLeft:'28px',
        marginTop:'18px'
    }
})

export default function SearchResult({ data, category }) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            {category === "albums" && data[0].hasOwnProperty("songs") && (
                <div className={classes.albumsDiv}>
                    {data && data.map(album => (
                        <div key={album.id} className={classes.gridChildElement}>
                            <div className={classes.details}>
                                <div>
                                <Avatar
                                    src={album.avatarUrl ?? "/album.png"}
                                    variant="square"
                                    className={classes.avatar}
                                    style={{
                                        marginLeft: "5px",
                                        marginTop: "5px"
                                    }}
                                    disabled
                                />
                                <Button
                                    className={classes.buttonDetails}
                                    variant='outlined'
                                    onClick={() => history.push(`/albums/details/${album.id}`)}
                                >
                                    Szczegóły
                                </Button>
                                </div>
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
                                        <strong> O Albumie: </strong>  {`${album.desc?.slice(0, 300) ?? "Brak opisu"} ${album.desc?.length > 425 ? "..." : ""}`}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {category === "users" && data[0].hasOwnProperty("nick") && (
                <div className={classes.albumsDiv}>
                {data && data.map(user => (
                    <div key={user.id} className={classes.gridChildElement}>
                        <div className={classes.details}>
                            <Avatar
                                src={user.avatar }
                                variant="square"
                                className={classes.avatar}
                                style={{
                                    marginLeft: "5px",
                                    marginTop: "5px"
                                }}
                            />
                            <div className={classes.profilInfo}>
                                <Typography>
                                    <strong> Nazwa użytkownika: </strong> {user.nick}
                                </Typography>
                                <Typography>
                                    <strong> Płeć: </strong> {user.gender}
                                </Typography>
                                <Typography>
                                    <strong> Telefon: </strong> {`+48 ${user.phone}`}
                                </Typography>
                                <Typography>
                                    <strong> Opis: </strong>  {`${user.description ?? "Brak Opisu.."}`}
                                </Typography>
                                <br></br>
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={() => history.push(`/profil/${user.id}`)}
                                >
                                    Zobacz profil
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )}

        </>

    )
}
