import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { handleRegisterUser, handleGetEmail, handleGetNick } from '../hooks/useAxios'
import { validate } from 'react-email-validator';

const useStyles = makeStyles((theme) => {
    return {
        inputFields: {
            marginTop: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5)
        },
        paperStyle: {
            padding: '30px 20px',
            width: 300,
            margin: "20px auto"
        },
        headerStyle: {
            margin: 0
        },
        avatarStyle: {
            backgroundColor: '#1bbd7e'
        },
        marginTop: {
            marginTop: 5
        }
    }
})


const Signup = () => {
    const btnstyle = { margin: '8px 0' };
    const classes = useStyles();
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [nick, setNick] = useState("");
    const [text, setText] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [nickError, setNickError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isTerms, setIsTerms] = useState(false);
    const [gender, setGender] = useState(null);
    const [registerError, setRegisterError] = useState("");

    const validateEmail = async () => {
        if (!validate(email)) {
            setEmailError("Podany adres email jest nieprawidłowy!")
        } else if (await handleGetEmail(email)) {
            setEmailError("Podany adres email jest już zajęty!")
        } else {
            setEmailError("")
        }
    }

    const validateNick = async () => {
        if (await handleGetNick(nick)) {
            setNickError("Podana nazwa użytkownika jest już zajęta!")
        } else {
            setNickError("")
        }
    }

    const validatePhone = () => {
        if (isNaN(phone) || phone.length !== 9) {
            setPhoneError("Podany numer telefonu ma zły format!")
        } else {
            setPhoneError("")
        }
    }

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError("Podane hasło jest za krótkie! Musi mieć minimum 6 znaków.")
        } else if (password !== confirmPassword && confirmPassword && password) {
            setPasswordError("Podane hasła muszą być identyczne!")
        } else {
            setPasswordError("")
        }
    }

    useEffect(() => {
        if (email && password && confirmPassword && nick && phone && isTerms &&
            !emailError && !passwordError && !nickError && !phoneError) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [email, password, confirmPassword, nick, phone, isTerms,
        emailError, passwordError, nickError, phoneError])

    const handleSingIn = async (e) => {
        setRegisterError("");
        e.preventDefault();
        const statusCode = await handleRegisterUser({
            email,
            nick,
            gender: gender ?? "Nie podano",
            phone,
            password
        });

        if (statusCode === 201) {
            history.push("/login")
        } else {
            setRegisterError("Coś poszło nie tak")
        }
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
                        type="text" color="secondary" variant="outlined" required value={nick}
                        onChange={(e) => setNick(e.target.value)} className={classes.inputFields}
                        onBlur={validateNick} error={nickError} helperText={nickError}
                    />
                    <TextField fullWidth label='Email' placeholder="Podaj email"
                        type="email" color="secondary" variant="outlined" required value={email}
                        onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail}
                        error={emailError} helperText={emailError}
                    />
                    <FormControl component="fieldset" className={classes.inputFields}>
                        <FormLabel component="legend">Płeć</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }} value={gender} onChange={(e) => setGender(e.target.value)}>
                            <FormControlLabel value="kobieta" control={<Radio />} label="Kobieta" />
                            <FormControlLabel value="mężczyzna" control={<Radio />} label="Mężczyzna" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth label='Numer telefonu' placeholder="Podaj numer telefonu"
                        type="phone" color="secondary" variant="outlined" required value={phone}
                        onChange={(e) => setPhone(e.target.value)} onBlur={validatePhone}
                        error={phoneError} helperText={phoneError}
                    />
                    <TextField fullWidth label='Hasło' placeholder="Podaj hasło"
                        type='password' color="secondary" variant="outlined" required value={password}
                        onChange={(e) => setPassword(e.target.value)} className={classes.inputFields}
                        onBlur={validatePassword} error={passwordError}
                    />
                    <TextField fullWidth label='Powtórz hasło' placeholder="Powtórz hasło"
                        type='password' color="secondary" variant="outlined" required value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={validatePassword} error={passwordError} helperText={passwordError}
                    />
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="Akceptuje warunki korzystania z aplikacji"
                        className={classes.inputFields}
                        value={isTerms}
                        onChange={(e) => setIsTerms(p => !p)}
                    />
                    <Button type='submit' variant='outlined' color='secondary'
                        size='large' style={btnstyle} fullWidth disabled={disabled}
                        onClick={handleSingIn}
                    >Zarejestruj się</Button>
                </form>
                <Button
                    onClick={() => history.push("/login")}
                >Masz już konto? Zaloguj się tutaj!</Button>
                {registerError &&
                    <Typography
                        variant='body2'
                        color="error"
                    >
                        {registerError}
                    </Typography>}
            </Paper>
        </Grid>
    )
}

export default Signup;