import React from "react";
import { TextField } from "@mui/material";

const InputField = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  required = true,
  readOnly = false,
}) => {
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      InputProps={{
        readOnly: readOnly,
      }}
      fullWidth
      variant="standard"
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
          color: "white",
          "&:focus": {
            color: "white",
          },
        },
      }}
    />
  );
};

export default InputField;
