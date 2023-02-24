import { useState } from 'react';
import Avatar from "@material-ui/core/Avatar"
import { Button, TextField, Typography } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import WcIcon from '@material-ui/icons/Wc';
import PublicIcon from '@material-ui/icons/Public';
import PhoneIcon from '@material-ui/icons/Phone';
import CreateIcon from '@material-ui/icons/Create';



export default function ProfileReadOnly({
    user,
    classes,
    isEditMode,
    setIsEditMode,
    userLoggedInProfile,
    handleUpdateUserProfileData }) {
        
    const [gender, setGender] = useState(user.gender);
    const [nationality, setNationality] = useState(user.nationality);
    const [phone, setPhone] = useState(user.phone);
    const [description, setDescription] = useState(user.description);
    const [avatar, setAvatar] = useState(user.avatar);


    const handleAnuluj = () => {
        setIsEditMode(false);
        setGender(user.gender);
        setNationality(user.nationality);
        setPhone(user.phone);
        setDescription(user.description);
        setAvatar(user.avatar);
    }
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleChangeToNewAvatar = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const result = await toBase64(file);
            setAvatar(result);
        }
    }

    return (
        <div className={classes.parent}>
            {user &&
                <>
                    <div className={classes.child}>
                        <Avatar src={avatar} className={classes.avatar} />
                        {isEditMode &&
                            <Button
                                variant='contained'
                                component="label"
                                style={{
                                    marginLeft: '-8px',
                                    marginTop: "20px"
                                }}
                                size='small'
                            >
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleChangeToNewAvatar(e)}
                                />
                                Zmień zdjęcie
                            </Button>
                        }
                    </div>
                    <div className={classes.child}>
                        {!isEditMode && userLoggedInProfile &&
                            <Button
                                variant="outlined"
                                style={{
                                    position: 'relative',
                                    top: '42px',
                                    right: '-1000px'
                                }}
                                onClick={() => setIsEditMode(prev => !prev)}
                            >
                                Edytuj profil
                            </Button>
                        }
                        {isEditMode &&
                            <>

                                <Button
                                    variant="outlined"
                                    style={{
                                        position: 'relative',
                                        top: '42px',
                                        right: '-1000px'
                                    }}
                                    onClick={() => handleAnuluj()}
                                >
                                    Anuluj
                                </Button>
                                <Button
                                    variant="outlined"
                                    style={{
                                        position: 'relative',
                                        top: '42px',
                                        right: '-1000px',
                                        marginLeft: "10px"
                                    }}
                                    onClick={() => handleUpdateUserProfileData({
                                        gender,
                                        nationality,
                                        phone,
                                        description,
                                        avatar
                                    })}
                                >
                                    Zapisz
                                </Button>

                            </>
                        }
                        <Typography
                            variant='h4'
                            className={classes.nickName}

                        >
                            {user?.nick}
                        </Typography>

                        <Typography variant='h6'>
                            <WcIcon style={{
                                marginRight: "10px"
                            }} />

                            {!isEditMode && user?.gender}
                            {isEditMode &&
                                <TextField
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />}
                        </Typography>

                        <Typography variant='h6'> <PublicIcon style={{
                            marginRight: "10px"
                        }} />
                            {!isEditMode && user?.nationality}
                            {isEditMode &&
                                <TextField
                                    value={nationality}
                                    onChange={(e) => setNationality(e.target.value)}
                                />}
                        </Typography>

                        <Typography variant='h6'>
                            <PhoneIcon style={{
                                marginRight: "10px"
                            }} />
                            {!isEditMode && user?.phone}
                            {isEditMode && <TextField
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />}
                        </Typography>

                        <Typography variant='h6'> <CreateIcon style={{
                            marginRight: "10px"
                        }} />
                            {!isEditMode && user?.description}
                            {isEditMode &&
                                <TextField
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    multiline
                                />}
                        </Typography>

                    </div>
                </>
            }

            <Divider
                style={{
                    backgroundColor: 'rgb(156, 156, 156)'
                }}
                variant="fullWidth"

            />
        </div>
    )
}
