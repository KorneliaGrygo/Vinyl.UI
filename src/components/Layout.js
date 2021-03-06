import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import AlbumIcon from '@material-ui/icons/Album';
import Divider from '@material-ui/core/Divider'

import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
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
        menuButton: {
            height: theme.spacing(10),
            fontSize: "1.5em"
        },
        logout: {
            marginTop: theme.spacing(1),
            paddingBottom: theme.spacing(2)
        }
    }
})

export default function Layout({ children }) {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const { user, dispatch } = useAuthContext()

    const menuItems = [
        {
            text: 'Strona G????wna',
            path: '/'
        },
        {
            text: 'Wyszukaj',
            path: '/wyszukaj'
        },
        {
            text: 'Profil',
            path: '/profil'
        }
    ]

    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        <AlbumIcon /> Vinyl.pl
                    </Typography>
                    {user && (
                        <>
                            <Typography className={classes.userBar}>
                                Witaj {user.nick} !
                            </Typography>
                            <Avatar src="/flower.jpg" className={classes.avatar} />
                        </>
                    )}
                </Toolbar>
                <Divider />
            </AppBar>

            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor='right'
                classes={{ paper: classes.drawerPaper }}
            >
                {/* list / links */}
                <List className={classes.menu}>
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
                    {user &&
                        <>
                            <ListItem
                                button
                                onClick={() => {
                                    dispatch({ type: "LOGOUT" })
                                    history.push("/")
                                }}
                                className={classes.logout}
                            >
                                <ListItemIcon>
                                    {<PowerSettingsNewIcon />}
                                </ListItemIcon>
                                <ListItemText
                                    primary="Wyloguj si??"
                                />
                            </ListItem>
                            <Divider />

                        </>
                    }
                </List>

            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}