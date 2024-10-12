import React from "react";
import { TextField } from "@mui/material";

const InputField = ({ id, name, label, value, onChange, type = "text", ...rest }) => {
    return (
        <TextField
          id={id}
          name={name}
          label={label}
          variant="standard"
          value={value}
          onChange={onChange}
          type={type}
          fullWidth
          required{...rest}
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
      );
    };
    
    export default InputField;
