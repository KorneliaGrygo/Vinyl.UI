import { Avatar, Typography } from '@material-ui/core';
import { PostAddTwoTone } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const useStyles = makeStyles(theme =>{
    return {
        wrapper:{
            marginLeft:"20px",
            padding:'5px',
            marginTop:'12px',
            border:'1px solid lightgray',
            borderRadius:'5px'
        },
        avatar:{
            height:"25px",
            width:"25px",
            cursor:"pointer"
        },
        userDetails:{
            display:"grid",
            gridTemplateColumns:"auto auto auto",
            borderRadius:'5px'
        },
        gridItem:{
            marginLeft:"-10px"
        },
        date:{
            marginLeft:"500px"
        },
        commentItSelf:{
            marginLeft:"30px",
            padding:'5px',
            marginTop:'5px',
            border:'1px solid lightgray',
            borderRadius:'5px'
        }
    }
})
export default function CommentSection(props) {
    const classes = useStyles();
    const history = useHistory();
  return (
    <>
        {props.comments && props.comments.map(comment => (
            <div className={classes.wrapper} key={comment.id}>
                <div className={classes.userDetails}>
                    <Avatar
                        variant='square'
                        className={classes.avatar}
                        src={comment.avatar}
                        onClick={()=>history.push(`/profil/${comment.userId}`)}
                    >
                    </Avatar>
                    <Typography className={classes.gridItem}>
                       <strong>{comment.nickName} </strong>
                    </Typography>
                    <Typography className={classes.date}> {comment.date} </Typography>
                </div>
                <div className={classes.commentItSelf}>
                        {comment.comment}
                </div>
            </div>
        ))}
        {
            !props.comments && (
                <Typography style={{
                    textAlign:'center'
                }}>
                    Brak komentarzy
                </Typography>
            )
        }

    </>
  )
}
