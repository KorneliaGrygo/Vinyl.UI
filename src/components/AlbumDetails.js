import { useRef } from 'react';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import useAuthContext from '../hooks/useAuthContext';
import {
    handleGetAlbumById,
    handleCheckIfUserAddedAlbumToFavorites,
    handleGetAlbumsCommentsSection
} from '../hooks/useAxios';

export default function AlbumDetails() {

    const { albumId } = useParams();
    const { user } = useAuthContext();
    const [album, setAlbum] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [comments, setComments] = useState([]);
    const abortController = useRef(new AbortController());
    useEffect(() => {
        const controller = abortController.current;
        //looks bad but its nessecary since we re using json server.. 
        const fetchAlbum = async () => {
            debugger;
            let album = await handleGetAlbumById(albumId);
            let isFavorite = await handleCheckIfUserAddedAlbumToFavorites(user?.id ?? 0, albumId);
            let comments = await handleGetAlbumsCommentsSection(albumId);
            setAlbum(album);
            setIsFavorite(isFavorite);
            setComments(comments);
        }
        fetchAlbum()
            .catch(err => {
                console.log(err.message);
            })

        return () => {
            controller.abort();
        }
    }, [albumId])

    return (
        <div>
            AlbumDetails {album?.releaseDate}
            <br />
            <p>Czy album jest w ulubionych :
                {isFavorite.toString()},
                <br />
                dane  userId:{user.id},
                <br />
                albumid: {albumId}</p>
            {comments && comments.map(comment => (
                <p>
                    nick komentującego: {comment.nickName}
                    <br />
                    komentarz: {comment.comment}
                    { }
                </p>
            ))}
        </div>
    )
}
