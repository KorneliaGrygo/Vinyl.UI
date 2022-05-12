import { makeStyles } from "@material-ui/styles";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { format } from 'date-fns'
import Avatar from "@material-ui/core/Avatar";
import AlbumIcon from '@material-ui/icons/Album';
import Divider from '@material-ui/core/Divider'

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        page: {
            width: '100%',
            padding: theme.spacing(3),
        },
        drawer: {
            width: -drawerWidth * 2
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            background: "#f4f4f4"
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: "100%"
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1,
        },
        avatar: {
            marginRight: theme.spacing(30),
            display: 'inline-block'
        },
        userBar: {
            marginRight: theme.spacing(1),
        },
        menuButton:{
            height: theme.spacing(10),
            fontSize:"1.5em"
        }
    }
})

export default function Layout({ children }) {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const menuItems = [
        {
            text: 'Strona Główna',
            path: '/'
        },
        {
            text: 'Wyszukaj',
            path: '/create'
        },
        {
            text: 'Profil',
            path: '/create'
        },
        {
            text: 'Wyloguj',
            path: '/create'
        }
    ]
    return (
        <div className={classes.root}>
            {/* app bar */}
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        <AlbumIcon /> Vinyl.pl
                    </Typography>
                    <Typography className={classes.userBar}>
                        Kornelia
                    </Typography>
                    <Avatar src="/flower.jpg" className={classes.avatar} />
                </Toolbar>
                    <Divider/>
            </AppBar>

            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor='right'
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant='h5' className={classes.title}>
                        
                    </Typography>
                </div>
                {/* list / links */}
                <List className = {classes.menu}>
                    {menuItems.map(item => (
                        <>
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => history.push(item.path)}
                                className={`${classes.menuButton} ${location.pathname == item.path ? classes.active : null}`}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText
                                primary={item.text} />
                            </ListItem>
                            <Divider
                                variant="fullWidth"
                            />
                        </>
                    ))}
                </List>

            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}