import { useState } from 'react';

import '../../App.css';
import BVCImage from '../bvc-image/BVCImage.component';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import getUserInfo from '../../utils/get-user-info';

//Should be replaced by the final authentication logic
import handleLoginAction from '../../placeholders/authentication/login.action';

export default function LoginForm({ loginType }) {
    const [toastState, setToastState] = useState({
        errorMessage: '',
        open: false,
        vertical: 'top',
        horizontal: 'right'
    });

    const currentUser = getUserInfo();

    //Prevent authenticated user from accessing this page
    if (currentUser) {
        if (currentUser.isAdmin) {
            window.location.href = 'admin/all-programs';
            return;
        }
        window.location.href = '/student/dashboard';
    }

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

    async function handleLogin(event) {
        event.preventDefault();

        const username = event.target.userEmail.value;
        const password = event.target.password.value;

        try {
            const userExists = await handleLoginAction(username, password);
            // console.log(userExists);            
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

                // await new Promise(resolve => setTimeout(resolve, 10000));
                //Should redirect the user to the homepage
                if (userExists.isAdmin) {
                    window.location.href = `/admin/all-programs`;
                } else {
                    window.location.href = `/student/all-programs`;
                }
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
            <div className="flex flex-col items-center text-white text-2xl bg-blue-600 w-5/6 md:w-2/6 rounded-xl shadow-md gap-5">
                <h1>{loginType} Portal</h1>
                <form
                    className="flex flex-col items-center justify-center gap-4 h-72 w-4/6 rounded-lg text-white bg-blue-400 mb-8"
                    onSubmit={handleLogin}
                >
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
