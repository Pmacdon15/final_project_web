import '../../App.css';
import BVCImage from '../bvc-image/BVCImage.component';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function LoginForm({loginType}) {
    return (
        <>
            <BVCImage />
            <div className="LoginHomePageMain">
                <h1>{loginType} Portal</h1>
                <form className='LoginForm'>                   
                    <TextField id="userEmail" name="userEmail" label="User Email" variant="standard" 
                    sx={{
                        "& .MuiInputLabel-root": {
                            color: "white",
                            "&.Mui-focused": {
                                color: "white",
                            },
                        },
                        "& .MuiInput-underline": {
                            "&:before": {
                                borderBottomColor: "white",
                            },
                            "&:after": {
                                borderBottomColor: "white",
                            },
                        },
                        "& .MuiInputBase-input": {
                            "&:focus": {
                                color: "white",
                            },
                            "&:not(:focus)": {
                                color: "white",
                            },
                        },
                    }}/>
                    <TextField id="password" name="password" label="Password" variant="standard" 
                    sx={{
                        "& .MuiInputLabel-root": {
                            color: "white",
                            "&.Mui-focused": {
                                color: "white",
                            },
                        },
                        "& .MuiInput-underline": {
                            "&:before": {
                                borderBottomColor: "white",
                            },
                            "&:after": {
                                borderBottomColor: "white",
                            },
                        },
                        "& .MuiInputBase-input": {
                            "&:focus": {
                                color: "white",
                            },
                            "&:not(:focus)": {
                                color: "white",
                            },
                        },
                    }}/>
                    <Button type="submit" variant="contained">Login</Button>
                </form>
            </div>
        </>
    )
}