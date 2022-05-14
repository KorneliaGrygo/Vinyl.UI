import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
    return {
        inputFields: {
            marginTop: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5)
        },
        paperStyle: { 
            padding: '30px 20px', 
            width: 300, 
            margin: "20px auto" },
        headerStyle: { 
            margin: 0 },
        avatarStyle: { 
            backgroundColor: '#1bbd7e' },
        marginTop: { 
            marginTop: 5 }
    }
})


const Signup = () => {
    const btnstyle = { margin: '8px 0' };
    const classes = useStyles();
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if(email && password){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    }, [email, password])
      
    const handleSingIn = (e) =>{
        e.preventDefault();
    }

    return (
        <Grid>
            <Paper elevation={20} className={classes.paperStyle}>
                <Grid align='center'>
                    <Avatar className={classes.avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 className={classes.headerStyle}>Zarejestruj się</h2>
                    <Typography variant='caption' gutterBottom></Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Nazwa użytkownika' placeholder="Podaj nazwę uzytkownika" 
                    type="text" color="secondary" variant="outlined" required value={text}
                    onChange={(e) =>setText(e.target.value)} className={classes.inputFields}/>
                    <TextField fullWidth label='Email' placeholder="Podaj email" 
                    type="email" color="secondary" variant="outlined" required value={email}
                    onChange={(e) =>setEmail(e.target.value)}/>
                    <FormControl component="fieldset" className={classes.inputFields}>
                        <FormLabel component="legend">Płeć</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                            <FormControlLabel value="kobieta" control={<Radio />} label="Kobieta" />
                            <FormControlLabel value="mężczyzna" control={<Radio />} label="Mężczyzna" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth label='Numer telefonu' placeholder="Podaj numer telefonu" 
                        type="tel" color="secondary" variant="outlined" required value={tel}
                        onChange={(e) =>setTel(e.target.value)}/>
                    <TextField fullWidth label='Hasło' placeholder="Podaj hasło"
                        type='password' color="secondary" variant="outlined" required value={password}
                        onChange={(e) =>setPassword(e.target.value)} className={classes.inputFields}/>
                    <TextField fullWidth label='Powtórz hasło' placeholder="Powtórz hasło"
                        type='password' color="secondary" variant="outlined" required value={confirmPassword}
                        onChange={(e) =>setConfirmPassword(e.target.value)}/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="Akceptuje warunki korzystania z aplikacji"
                        className={classes.inputFields}
                    />
                    <Button type='submit' variant='outlined' color='secondary'
                        size='large' style={btnstyle} fullWidth disabled={disabled}
                    >Zarejestruj się</Button>
                </form>
                <Button
                    onClick={() => history.push("/login")}
                >Masz już konto? Zaloguj się tutaj!</Button>
            </Paper>
        </Grid>
    )
}

export default Signup;