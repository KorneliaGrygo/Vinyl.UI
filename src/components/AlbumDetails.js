import { TextField, Button, Icon } from '@material-ui/core';
import { useRef } from 'react';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import useAuthContext from '../hooks/useAuthContext';
import Avatar from "@material-ui/core/Avatar";
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import {
    handleGetAlbumById,
    handleCheckIfUserAddedAlbumToFavorites,
    handleGetAlbumsCommentsSection,
    handleAddNewComentToAlbum,
    handleAddToFavorites,
    handleDeleteFromFavorites
} from '../hooks/useAxios';
import { makeStyles } from "@material-ui/styles";
import SongList from './SongList';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentSection from './CommentSection';
const wd = "84%"

const useStyles = makeStyles(theme => {
    return {
        albumWrapper: {
            border: '1px solid',
            borderColor: "lightgray",
            borderRadius: '5px',
            height: "300px",
            width: '84%',
            marginTop: '10px',
            grid: 'flex',

        },
        songsList: {
            border: '1px solid',
            borderColor: "lightgray",
            borderRadius: '5px',
            height: "220px",
            maxHeight: "1000px",
            width: wd,
            marginTop: '10px',
            overflowY: "auto"
        },
        avatarBox: {
            marginLeft: '40px',
            marginTop: '30px',
            border: '1px solid',
            maxWidth: '250px',
            maxHeight: "250px"
        },
        avatar: {
            width: '250px',
            height: '250px',
            textAlign: 'center',
            border: "1px solid black"
        },
        albumInfo: {
            fontSize: '24px',
            marginLeft: '280px',
            marginTop: "-260px",
            width: '800px'
        },
        songsWrapper: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            padding: " 10px",
        },
        commentTitle: {
            marginLeft: '20px',
            marginTop: '10px'
        },
        commentSection: {
            marginTop: '5px',
            width: "55%",
            border: '1px solid',
            borderColor: "lightgray",
            borderRadius: '5px',
            height: "350px",
            maxHeight: "450px",
            overflowY: 'auto',
            padding: '3px'
        },
        favorite: {
            marginLeft: "930px",
            marginTop: "-250px"
        },
        addComment: {
            width: "55%",
            marginTop: '10px'
        }
    }

})

export default function AlbumDetails() {
    const classes = useStyles();
    const { albumId } = useParams();
    const { user } = useAuthContext();

    const [album, setAlbum] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [comments, setComments] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [refresh, setRefhresh] = useState(false);
    const [refreshFavorite, setRefreshFavorite] = useState(false);
    const [error, setError] = useState("");

    const abortController = useRef(new AbortController());

    const handleAddNewComment = async (e) => {
        e.preventDefault();
        if (commentText && commentText.length <= 450) {
            const statusCode = await handleAddNewComentToAlbum(user.id, albumId, user.nick, commentText, user.avatar);
            if (statusCode === 201) {
                setCommentText('');
                setRefhresh(prev => !prev);
            }
        }
    }
    const handleAddOrDeleteFromFavorites = async () => {
        if (isFavorite) {
            await handleDeleteFromFavorites(isFavorite.id);
            setRefreshFavorite(prev => !prev);
        } else {
            await handleAddToFavorites(albumId, user.id);
            setRefreshFavorite(prev => !prev)
        }
    }
    useEffect(() => {
        const controller = abortController.current;
        const fetchAlbum = async () => {
            let album = await handleGetAlbumById(albumId);
            setAlbum(album);
        }
        fetchAlbum();
        return () => {
            controller.abort();
        }
    }, [albumId])
    useEffect(() => {

        const controller = abortController.current;
        const fetchComments = async () => {
            let comments = await handleGetAlbumsCommentsSection(albumId);
            setComments(comments);
        }
        fetchComments();
        return () => {
            controller.abort();
        }
    }, [refresh])
    useEffect(() => {
        const controller = abortController.current;

        const fetchIsFavorite = async () => {
            let isFavorite = await handleCheckIfUserAddedAlbumToFavorites(user?.id ?? 0, albumId);
            setIsFavorite(isFavorite[0] ?? false);
        }
        fetchIsFavorite();

        return () => {
            controller.abort();
        }

    }, [refreshFavorite])
    return (

        <div>
            {album && (
                <>

                    <div className={classes.albumWrapper}>
                        <div className={classes.avatarBox}>
                            <Avatar
                                className={classes.avatar}
                                src={album.avatarUrl ?? '/album.png'}
                                variant='square'
                            />

                            <div className={classes.albumInfo}>
                                <Typography
                                    style={{ fontSize: 32 }}
                                >
                                    <strong> Nazwa Albumu: </strong>  {album.name}
                                </Typography>
                                <Typography

                                >
                                    <strong> Data wydania: </strong> {album.releaseDate}
                                </Typography>
                                <Typography>
                                    <strong>O albumie: </strong> {album.desc}
                                </Typography>

                                {user?.id && <div className={classes.favorite} onClick={handleAddOrDeleteFromFavorites}>
                                    {isFavorite ?
                                        <FavoriteIcon fontSize='large' /> : <FavoriteBorderIcon fontSize='large' />}
                                </div>}
                            </div>
                        </div>

                    </div>
                    <div className={classes.songsList}>
                        <div className={classes.songsWrapper}>
                            <SongList songs={album.songs} />
                        </div>
                    </div>
                    <Typography className={classes.commentTitle}
                        variant='h4'
                    >
                        Komentarze:
                    </Typography>
                    <div className={classes.commentSection}>
                        <CommentSection comments={comments} />
                    </div>

                    <form className={classes.addComment} noValidate autoComplete="off" onSubmit={handleAddNewComment} >
                        <TextField
                            fullWidth
                            variant='outlined'
                            placeholder='Wpisz komentarz'
                            color='secondary'
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            label="Wpisz komentarz"
                            error={commentText.length >= 450}
                        >

                        </TextField>
                        {error &&
                            <Typography
                                color="error"
                                variant='body1'
                            >
                                {error}
                            </Typography>}
                    </form>

                </>)}

        </div>
    )
}
