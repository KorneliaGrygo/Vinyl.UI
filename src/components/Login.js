import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {handleGetUser} from '../hooks/useAxios';
import useAuthContext from '../hooks/useAuthContext';

const useStyles = makeStyles((theme) => {
    return {
        inputFields: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(3)
        },
        accept: {
            marginTop: theme.spacing(1)
        },
        paperStyle: {
            padding: "20px",
            height: '650px',
            width: "280px",
            margin: "20px auto"
        },
        avatarStyle: {
            backgroundColor: '#1bbd7e'
        }
    }
})


const Login = () => {
    const btnstyle = { margin: '8px 0' }
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState("")
    const { dispatch } = useAuthContext();


    useEffect(() => {
        if (email && password) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [email, password])



    const handleSingIn = async (e) => {
        setError("");
        e.preventDefault();
        const user = await handleGetUser(email, password);
        if (!user) {
            setError("Podano zły email lub hasło")
        } else {
            dispatch({ type: "LOGIN", payload: user })
            history.push("/")
        }
    }

    return (
        <Grid>
            <Paper elevation={10} className={classes.paperStyle}>
                <Grid align='center'>
                    <Avatar className={classes.avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Zaloguj się </h2>
                </Grid>
                <form >
                    <TextField
                        label='Email'
                        placeholder='Wprowadź Email'
                        fullWidth
                        required
                        variant="outlined"
                        className={classes.inputFields}
                        color="secondary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label='Hasło'
                        placeholder='Wprowadź hasło'
                        type='password'
                        fullWidth
                        required
                        color="secondary"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <div
                        className={classes.accept}
                    >
                        <FormControlLabel
                            control={<Checkbox
                                name="checkedA"
                            />}
                            label="Pamiętaj mnie"
                        />
                    </div>
                    <Button
                        type='submit'
                        color='secondary'
                        variant='outlined'
                        size='large'
                        style={btnstyle}
                        fullWidth
                        disabled={disabled}
                        onClick={handleSingIn}
                    >Zaloguj się
                    </Button>
                </form>
                <Button
                    onClick={() => history.push("/signup")}
                >
                    Nie masz konta? Załóż je tutaj !

                </Button>
                {error &&
                    <Typography
                        color="error"
                        variant='body1'
                    >
                        {error}
                    </Typography>}
            </Paper>
        </Grid>
    )
}

export default Login