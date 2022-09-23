import { useState, useEffect } from 'react'
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from "@material-ui/styles"
import { Typography } from '@material-ui/core'
import useAuthContext from '../hooks/useAuthContext'
import Divider from '@material-ui/core/Divider'
import WcIcon from '@material-ui/icons/Wc';
import PublicIcon from '@material-ui/icons/Public';
import PhoneIcon from '@material-ui/icons/Phone';
import CreateIcon from '@material-ui/icons/Create';
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { handleGetUserById,handleGetFavoriteAlbums } from '../hooks/useAxios'
import RecommendedAlbums from '../components/RecommendedAlbums';
import FavAlbums from '../components/FavAlbums'

const useStyles = makeStyles ({
    avatar:{
        width: "100px",
        height: "100px",
        border: "5px"
    },
    parent: {
        padding: "2rem 2rem",
        textAlign: "left",
    },
    child: {
        display: "inline-block",
        verticalAlign: "middle",
        padding: "1rem 1rem",
    },
    nickName: {
        marginBottom: "15px",
        
    },
    favAlbums:{
        marginTop:'5px',
        border:"1px solid black",
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
    }
})

export default function Profile() {
const classes = useStyles();

const [user,setUser] = useState(null);
const [favAlbums,setFavAlbums] = useState([]);
const {userId} = useParams();

useEffect(() => {
    const getData = async () =>{
        let user = await handleGetUserById(userId);
        if (user) {
            setUser(user);
            let favAlbums = await handleGetFavoriteAlbums(userId);
            if(favAlbums){
                setFavAlbums(favAlbums);
            }
        }
    }

    getData();
  
}, [userId])

  return (
    <div style={{
        width: `Calc(100% - 240px)`
    }}>

        { user && (
        <div className={classes.parent}>
            <div className={classes.child}> 
            <Avatar src={user.avatar} className={classes.avatar} />
            </div>
            <div className={classes.child}>
                <Typography 
                    variant='h4'
                    className={classes.nickName}
                >
                {user?.nick} 
                </Typography>

                <Typography variant='h6'> <WcIcon style={{
                  marginRight: "10px"}} /> 
                {user?.gender} 
                </Typography>

                <Typography variant='h6'> <PublicIcon style={{
                  marginRight: "10px"}} />
                {user?.nationality} 
                </Typography>

                <Typography variant='h6'>  <PhoneIcon style={{
                  marginRight: "10px"}} />
                {user?.phone} 
                </Typography>

                <Typography variant='h6'> <CreateIcon style={{
                  marginRight: "10px"}}  />
                {user?.description}
                </Typography>

            </div>

            <Divider 
                style={{
                    backgroundColor:'rgb(156, 156, 156)'
                }}
                variant = "fullWidth"
                
            />
        </div>
         )}
        <div >
            <Typography variant='h4' >
                Ulubione:  
                <div className={classes.favAlbums}>

                
                {favAlbums?.length && 
                    <div className={classes.favWrapper}>
                        <FavAlbums albums={favAlbums} />
                    </div>
                
                }
                </div>
            </Typography>
        </div>
               
    </div>
  )
}