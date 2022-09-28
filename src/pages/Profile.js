import { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/styles"
import { Typography } from '@material-ui/core'
import useAuthContext from '../hooks/useAuthContext'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import {
    handleGetUserById,
    handleGetFavoriteAlbums,
    handleUserProfileUpdate
} from '../hooks/useAxios'
import FavAlbums from '../components/FavAlbums'
import ProfileReadOnly from '../components/ProfileReadOnly'

const useStyles = makeStyles({
    avatar: {
        width: "100px",
        height: "100px",
        border: "5px",
        position: "relative",
        top: '10px'
    },
    parent: {
        padding: "2rem 2rem",
        maxHeight: '500px'
    },
    child: {
        display: "inline-block",
        verticalAlign: "middle",
        padding: "1rem 1rem",
    },
    nickName: {
        marginBottom: "15px",

    },
    favAlbums: {
        marginTop: '5px',
        border: "1px solid black",
        borderColor: "lightgray",
        borderRadius: '5px',
        height: "219px",
        maxHeight: "1000px",
        width: "100%",
        marginTop: '10px',
        overflowY: "auto"
    },
    favWrapper: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
        padding: " 5px",
    },
    inputs: {
        display: "block",
    },
    inputsIcons: {
        display: ''
    }
})

export default function Profile() {
    const classes = useStyles();
    const { user: userLoggedIn, dispatch } = useAuthContext();
    const [user, setUser] = useState(null);
    const [favAlbums, setFavAlbums] = useState([]);
    const { userId } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const [userLoggedInProfile, setUserLoggedInProfile] = useState(userLoggedIn?.id == userId)
    const [shouldRefresh, setShouldRefresh] = useState(false);

    const handleUpdateUserProfileData = async (userData) => {
        const response = await handleUserProfileUpdate(userData, userId);
        if (response === 200) {
            setShouldRefresh(prev => !prev);
            setIsEditMode(false);
            let user = await handleGetUserById(userId);
            if (user) {
                setUser(user);
            }
            dispatch({ type: "LOGIN", payload: user });
        }
    }
    useEffect(() => {
        const getData = async () => {
            let user = await handleGetUserById(userId);
            if (user) {
                setUser(user);
                let favAlbums = await handleGetFavoriteAlbums(userId);
                if (favAlbums) {
                    setFavAlbums(favAlbums);
                }
            }
        }
        getData();
        setUserLoggedInProfile(userLoggedIn?.id == userId);

    }, [userId, shouldRefresh])


    return (
        <div style={{
            width: `Calc(100% - 240px)`
        }}>
            {user &&
                <>
                    <ProfileReadOnly
                        classes={classes}
                        user={user}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                        userLoggedInProfile={userLoggedInProfile}
                        handleUpdateUserProfileData={handleUpdateUserProfileData}
                    />
                    <div >
                        <Typography variant='h4' >
                            Ulubione:
                            <div className={classes.favAlbums}>
                                {favAlbums?.length > 0 &&
                                    <div className={classes.favWrapper}>
                                        <FavAlbums albums={favAlbums} />
                                    </div>
                                }
                            </div>
                        </Typography>
                    </div>
                </>
            }
            {!user && <p>Profil o takim Id nie istnieje</p>}

        </div>
    )
}