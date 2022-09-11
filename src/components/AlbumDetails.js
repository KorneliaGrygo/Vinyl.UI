import { TextField, Button } from '@material-ui/core';
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
    handleAddNewComentToAlbum
} from '../hooks/useAxios';
import { makeStyles } from "@material-ui/styles";
import SongList from './SongList';



const useStyles = makeStyles(theme => {
    return {
        albumWrapper:{
            border: '1px solid',
            borderColor:"lightgray",
            borderRadius:'5px',
            height:"300px",
            width:'84%',
            marginTop:'10px',
            grid:'flex',
        },
        songsList:{
            border: '1px solid',
            borderColor:"lightgray",
            borderRadius:'5px',
            height:"300px",
            width:'84%',
            marginTop:'10px',
        },
        avatarBox:{
            marginLeft:'40px',
            marginTop:'30px',
            border:'1px solid',
            maxWidth:'250px',
            maxHeight:"250px"
        },
        avatar:{
            width:'250px',
            height:'250px',
            textAlign:'center'
        },
        albumInfo:{
            fontSize:'24px',
            marginLeft:'280px',
            marginTop:"-260px",
            width:'800px'
        }
    }
    
})

export default function AlbumDetails() {
    const classes = useStyles();

    const { albumId } = useParams();
    const { user } = useAuthContext();
    const [album, setAlbum] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [comments, setComments] = useState([]);
    const abortController = useRef(new AbortController());
    const [commentText, setCommentText] = useState('');
    const [refresh, setRefhresh] = useState(false);

    const handleAddNewComment = async (e) => {
        e.preventDefault();
        if (commentText && commentText.length <= 450) {
            const statusCode = await handleAddNewComentToAlbum(user.id, albumId, user.nick, commentText);
            if(statusCode === 201){
                setCommentText('');
                setRefhresh(prev => !prev);
            }
        }
        
    }

    useEffect(() => {
        const controller = abortController.current;
        //looks bad but its nessecary since we re using json server.. 


        const fetchAlbum = async () => {
            let album = await handleGetAlbumById(albumId);
            let isFavorite = await handleCheckIfUserAddedAlbumToFavorites(user?.id ?? 0, albumId);
            setAlbum(album);
            setIsFavorite(isFavorite);
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
        return () =>{
            controller.abort();
        }
    },[refresh])

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
                        style={{fontSize:32}}
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
                </div>
                </div>
           
            </div>
            <div className={classes.songsList}>
                <SongList  songs={album.songs} />
            </div>
            <div className={classes.commentSection}>

            </div>

            </> )}

        </div>
    )
}
