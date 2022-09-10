import { TextField, Button } from '@material-ui/core';
import { useRef } from 'react';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import useAuthContext from '../hooks/useAuthContext';
import {
    handleGetAlbumById,
    handleCheckIfUserAddedAlbumToFavorites,
    handleGetAlbumsCommentsSection,
    handleAddNewComentToAlbum
} from '../hooks/useAxios';

export default function AlbumDetails() {

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
        fetchAlbum()
            .catch(err => {
                console.log(err.message);
            })

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
        

        </div>
    )
}
