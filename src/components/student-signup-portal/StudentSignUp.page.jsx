import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BVCImage from "../bvc-image/BVCImage.component";
import { TextField, Button, Container, Grid } from "@mui/material";

const StudentSignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    department: "Software Development", // Default to 'Software Development' as only this department is available
    program: "",
    username: "",
    password: "",
  });

  const [studentId, setStudentId] = useState("");

  // Handles form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Generate a random Student ID (you can customize the format)
  const generateStudentId = () => {
    return `SD${Math.floor(Math.random() * 1000000)}`;
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a Student ID and update state
    const newStudentId = generateStudentId();
    setStudentId(newStudentId);

    // Store form data and the generated Student ID in localStorage
    const signupData = {
      ...formData,
      studentId: newStudentId, // Include the generated Student ID
    };
    localStorage.setItem("studentSignupData", JSON.stringify(signupData));

    // You can handle signup logic here (e.g., send data to backend API)
    console.log("Generated Student ID:", newStudentId);
    // Redirect to welcome page after signup
    navigate(`/student-portal-dashboard/${formData.email}`);
  };

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
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="standard"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  required
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="standard"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  required
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="standard"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone"
                  variant="standard"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  required
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="birthday"
                  name="birthday"
                  label="Birthday"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.birthday}
                  onChange={handleChange}
                  fullWidth
                  required
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="department"
                  name="department"
                  label="Department"
                  variant="standard"
                  value={formData.department}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="program"
                  name="program"
                  label="Program"
                  variant="standard"
                  value={formData.program}
                  onChange={handleChange}
                  fullWidth
                  required
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  variant="standard"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  required
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="standard"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
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
              </Grid>

              <Grid item xs={12} className="text-center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    mt: 2,
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </>
  );
};

export default StudentSignupForm;
