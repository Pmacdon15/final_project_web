import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import BVCImage from "../bvc-image/BVCImage.component";
import { Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputField from "./inputField.component";
import { RegisterUser } from "../../placeholders/load-data/loadData.action"; // Import SaveUserData function
import { TextField } from "@mui/material";

const StudentSignupForm = () => {
  const navigate = useNavigate();
  const formDataRef = useRef({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    department: "Software Development",
    program: "",
    username: "",
    password: "",
  });

  // Handles form input changes
  const handleChange = (e) => {
    formDataRef.current[e.target.name] = e.target.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = { ...formDataRef.current };

    try {
      const response = await RegisterUser(signupData); // Call the API
      console.log("Signup successful:", response);

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.message);
      // Optionally display an error message to the user
    }
  };
  const options = [
    {
      value: "Diploma",
      label: "Diploma",
    },
    {
      value: "Post diploma",
      label: "Post diploma",
    },
    {
      value: "Certificate",
      label: "Certificate",
    },
  ];

  return (
    <>
      <BVCImage className="w-1/2" />
      <div className="flex flex-col items-center mb-2 text-white text-2xl bg-blue-600 w-5/6 md:w-2/6 rounded-xl shadow-md gap-5">
        <Container
          maxWidth="sm"
          className="flex flex-col items-center text-white text-2xl bg-blue-600 w-5/6 md:w-2/6 rounded-xl shadow-md gap-5"
        >
          <h2 className="pt-3">Student Signup</h2>
          <form
            className="flex flex-col items-center justify-center px-3 py-3 rounded-lg bg-blue-400 mb-8"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <InputField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  type="text"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <InputField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12}>
                <InputField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12}>
                <InputField
                  id="phone"
                  name="phone"
                  label="Phone"
                  type="number"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12}>
                <InputField
                  id="birthday"
                  name="birthday"
                  label="Birthday"
                  placeholder="mm/dd/yyyy"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12}>
                <InputField
                  id="department"
                  name="department"
                  label="Department"
                  value={"Software Development"}
                  readOnly
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id="program"
                  select
                  label="Program"
                  defaultValue="Diploma"
                  variant="standard"
                  fullWidth
                  slotProps={{
                    select: {
                      native: true,
                    },
                  }}
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
                        color: 'black'
                      },
                      '&:not(:focus)': {
                        color: 'white'
                      }
                    }
                  }}
                  helperText="Please select program"
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                {/* <InputField
                  id="program"
                  name="program"
                  label="Program"
                  onChange={handleChange}
                /> */}
              </Grid>
              <Grid xs={12}>
                <InputField
                  id="username"
                  name="username"
                  label="Username"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12}>
                <InputField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} className="text-center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid xs={12} className="text-center text-xs">
                <a href="/">Click here to Sign In</a>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </>
  );
};

export default StudentSignupForm;
