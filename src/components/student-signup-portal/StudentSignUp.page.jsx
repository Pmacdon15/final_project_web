import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BVCImage from "../bvc-image/BVCImage.component";
import { Button, Container, Grid } from "@mui/material";
import InputField from "./inputField.component";
import { SaveUserData } from "../../placeholders/load-data/loadData.action"; // Import SaveUserData function

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

  // Handles form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Generate a random Student ID
  const generateStudentId = () => {
    return `SD${Math.floor(Math.random() * 1000000)}`;
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a Student ID and update state
    const newStudentId = generateStudentId();

    // Store form data and the generated Student ID in localStorage
    const signupData = {
      ...formData,
      studentId: newStudentId,
    };

    SaveUserData(signupData); // Call SaveUserData to save the form data to local storage

    // Redirect to welcome page after signup
    navigate(`/student-portal-dashboard/${formData.email}`); // Redirect after signup
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
                <InputField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  id="phone"
                  name="phone"
                  label="Phone"
                  type="number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  id="birthday"
                  name="birthday"
                  label="Birthday"
                  placeholder="mm/dd/yyyy"
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  id="department"
                  name="department"
                  label="Department"
                  value={formData.department}
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  id="program"
                  name="program"
                  label="Program"
                  value={formData.program}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  id="username"
                  name="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} className="text-center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
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
