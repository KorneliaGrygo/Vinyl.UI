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
    handleDeleteFromFavorites,
    handleGetBandsAlbums,
    handleDeleteInvalidComment,
    handleDeleteFromShopping,
    handleAddToShopping,
    handleCheckIfUserAddedAlbumToShopping
} from '../hooks/RequestHandlers';
import { makeStyles } from "@material-ui/styles";
import SongList from './SongList';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import CommentSection from './CommentSection';
import RecommendedAlbums from './RecommendedAlbums';
const wd = "84%";

const useStyles = makeStyles(theme => {
    return {
        albumWrapper: {
            border: '1px solid',
            borderColor: "lightgray",
            borderRadius: '5px',
            height: "300px",
            width: '84%',
            marginTop: '10px',
            grid: 'flex'
        },
        songsList: {
            border: '1px solid',
            borderColor: "lightgray",
            borderRadius: '5px',
            height: "180px",
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
            width: '800px',
            textAlign:'justify'
        },
        songsWrapper: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            padding: " 5px",
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
            overflowY: 'auto',
            padding: '3px',
            gridColumnStart: "1",
            gridColumnEnd: "3"
        },
        favorite: {
            position:"relative",
            top:"-260px",
            right:'-1300px'
        },
        shopping: {
            position:"relative",
            top:"-260px",
            right:'-1300px'
        },
        price: {
            position:"relative",
            top:"-50px",
            right:'-990px'
        },
        addComment: {
            width: "55%",
            marginTop: '10px'
        },
        secondSection: {
            display: 'grid',
            gridTemplateColumns: "1 2/3"
        }

    }

})

export default function AlbumDetails() {
    const classes = useStyles();
    const { albumId } = useParams();
    const { user } = useAuthContext();
    const [album, setAlbum] = useState(null);
    const [bandsAlbums, setBandsAlbums] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isShopping, setIsShopping] = useState(false);
    const [comments, setComments] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [refreshFavorite, setRefreshFavorite] = useState(false);
    const [refreshShopping, setRefreshShopping] = useState(false);
    const [error, setError] = useState("");
    const abortController = useRef(new AbortController());

    const handleAddNewComment = async (e) => {
        e.preventDefault();
        if (commentText && commentText.length <= 450) {
            const statusCode = await handleAddNewComentToAlbum(user.id, albumId, user.nick, commentText, user.avatar);
            if (statusCode === 201) {
                setCommentText('');
                setRefresh(prev => !prev);
            }
        }
    }
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
    }, [refresh, albumId])


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

        const fetchIsFavorite = async () => {
            let isFavorite = await handleCheckIfUserAddedAlbumToFavorites(user?.id ?? 0, albumId);
            if(isFavorite){
                setIsFavorite(isFavorite[0]);
            }else{
                setIsFavorite(false);
            }
        }
        fetchIsFavorite();
        
        return () => {
            controller.abort();
        }
    }, [refreshFavorite, albumId])


    const handleAddOrDeleteFromShopping = async () => {
        if (isShopping) {
            await handleDeleteFromShopping(isShopping.id);
            setRefreshShopping(prev => !prev);
        } else {
            await handleAddToShopping(albumId, user.id);
            setRefreshShopping(prev => !prev)
        }
    }
    useEffect(() => {
        const controller = abortController.current;

        const fetchIsShopping = async () => {
            let isShopping = await handleCheckIfUserAddedAlbumToShopping(user?.id ?? 0, albumId);
            if(isShopping){
                setIsShopping(isShopping[0]);
            }else{
                setIsShopping(false);
            }
        }
        fetchIsShopping();

        return () => {
            controller.abort();
        }
    }, [refreshShopping, albumId])


    useEffect(() => {
        const controller = abortController.current;
        const fetchAlbum = async () => {
            let album = await handleGetAlbumById(albumId);
            if(album){
                setAlbum(album);
                const bandsAl = await handleGetBandsAlbums(album.band);
                if(bandsAl){
                    setBandsAlbums(bandsAl);
                }
            }
        }
        fetchAlbum();
        return () => {
            controller.abort();
        }
    }, [albumId])

    
    return (

        <div>
            {album && (
                <>

                    <div className={classes.albumWrapper}>
                        <div className={classes.avatarBox}>
                            <Avatar
                                className={classes.avatar}
                                src= {`/${album.avatarUrl}` ?? '/album.png'}
                                variant='square'
                            />

                            <div className={classes.albumInfo}>
                                <Typography style={{ fontSize: 32 }}>
                                    <strong> Nazwa Albumu: </strong>  {album.name}
                                </Typography>
                                <Typography>
                                    <strong> Data wydania: </strong> {album.releaseDate}
                                </Typography>
                                <Typography>
                                    <strong>O albumie: </strong> {album.desc}
                                </Typography>
                                <Typography style={{ fontSize: 20 }} className={classes.price}>
                                    <strong>    {album.price} zł </strong>
                                </Typography>
                            </div>
                        </div>
                    </div>

                    {user?.id &&
                        <>              
                            <div className={classes.favorite} onClick={handleAddOrDeleteFromFavorites}>
                                {isFavorite ?
                                    <FavoriteIcon fontSize='large' /> : <FavoriteBorderIcon fontSize='large' />}
                            </div>

                            <div className={classes.shopping} onClick={handleAddOrDeleteFromShopping}>
                                {isShopping ?
                                    <ShoppingCartIcon fontSize='large' /> : <ShoppingCartOutlinedIcon fontSize='large' />}
                            </div>
      
                        </>
                    }

                    <div className={classes.songsList}>
                        <div className={classes.songsWrapper}>
                            <SongList songs={album.songs} />
                        </div>
                    </div>
                    <div className={classes.secondSection}>
                        <Typography className={classes.commentTitle}
                            variant='h4'
                        >
                            Komentarze:
                        </Typography>
                        <div className={classes.commentSection} >
                            <CommentSection comments={comments}
                             handleDeleteInvalidComment = {handleDeleteInvalidComment}
                             shouldRefresh = {setRefresh}
                             />
                        </div>
                        <RecommendedAlbums bandsAlbums={bandsAlbums?.filter(album => album.id != albumId)}/>
                    </div>
               
                </>)}
                {user && 
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
                    }

        </div>
    )
}
