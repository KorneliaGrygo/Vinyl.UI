import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Zarejestruj się</h2>
                    <Typography variant='caption' gutterBottom></Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Nazwa użytkownika' placeholder="Podaj nazwę uzytkownika" />
                    <TextField fullWidth label='Email' placeholder="Podaj email" />
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Płeć</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                            <FormControlLabel value="kobieta" control={<Radio />} label="Kobieta" />
                            <FormControlLabel value="mężczyzna" control={<Radio />} label="Mężczyzna" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth label='Numer telefonu' placeholder="Podaj numer telefonu" />
                    <TextField fullWidth label='Hasło' placeholder="Podaj hasło"/>
                    <TextField fullWidth label='Powtórz hasło' placeholder="Powtórz hasło"/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="Akceptuje warunki korzystania z aplikacji."
                    />
                    <Button type='submit' variant='contained' color='primary'>Zarejestruj się</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;