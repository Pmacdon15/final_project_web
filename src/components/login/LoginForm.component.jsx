import { useState } from 'react';

import '../../App.css';
import BVCImage from '../bvc-image/BVCImage.component';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

//Should be replaced by the final authentication logic
import handleLoginAction from '../../placeholders/authentication/login.action';

export default function LoginForm({ loginType }) {
    const [toastState, setToastState] = useState({
        errorMessage: '',
        open: false,
        vertical: 'top',
        horizontal: 'right'
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToastState({
            errorMessage: '',
            open: false,
            vertical: 'top',
            horizontal: 'right'
        });
    };

    const { vertical, horizontal, open, errorMessage } = toastState;

    function handleLogin(event) {
        event.preventDefault();

        const username = event.target.userEmail.value;
        const password = event.target.password.value;

        try {
            const userExists = handleLoginAction(username, password);

            if (!userExists) {
                setToastState(oldState => ({
                    ...oldState,
                    open: true,
                    errorMessage: 'User does not exist !'
                }));
                return;
            } else {
                setToastState(oldState => ({
                    ...oldState,
                    open: false,
                    errorMessage: ''
                }));

                //Should redirect the user to the homepage
                console.log(userExists);
            }
        } catch (error) {
            if (error?.message) {
                setToastState(oldState => ({
                    ...oldState,
                    open: true,
                    errorMessage: error.message
                }));
                return;
            }

            setToastState(oldState => ({
                ...oldState,
                open: true,
                errorMessage: 'An error occurred !'
            }));
        }
    }

    return (
        <>
            {/* will be moved to a component  */}
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={errorMessage}
                key={errorMessage + vertical + horizontal}
                autoHideDuration={5000}
                severity="error"
                ContentProps={{
                    sx: {
                        background: 'red'
                    }
                }}
            />

            <BVCImage />
            <div className="LoginHomePageMain">
                <h1>{loginType} Portal</h1>
                <form className="LoginForm" onSubmit={handleLogin}>
                    <TextField
                        id="userEmail"
                        name="userEmail"
                        label="User Email"
                        variant="standard"
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: 'white',
                                '&.Mui-focused': {
                                    color: 'white'
                                }
                            },
                            '& .MuiInput-underline': {
                                '&:before': {
                                    borderBottomColor: 'white'
                                },
                                '&:after': {
                                    borderBottomColor: 'white'
                                }
                            },
                            '& .MuiInputBase-input': {
                                '&:focus': {
                                    color: 'white'
                                },
                                '&:not(:focus)': {
                                    color: 'white'
                                }
                            }
                        }}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        variant="standard"
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: 'white',
                                '&.Mui-focused': {
                                    color: 'white'
                                }
                            },
                            '& .MuiInput-underline': {
                                '&:before': {
                                    borderBottomColor: 'white'
                                },
                                '&:after': {
                                    borderBottomColor: 'white'
                                }
                            },
                            '& .MuiInputBase-input': {
                                '&:focus': {
                                    color: 'white'
                                },
                                '&:not(:focus)': {
                                    color: 'white'
                                }
                            }
                        }}
                    />
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                </form>
            </div>
        </>
    );
}
