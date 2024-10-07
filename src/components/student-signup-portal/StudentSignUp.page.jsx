import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    // You can handle signup logic here (e.g., send data to backend API)
    console.log("Generated Student ID:", newStudentId);
    // Redirect to welcome page after signup
    navigate(`/student-portal-dashboard/${formData.email}`);
  };

  return (
    <div>
      <h2>Student Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Birthday:
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={formData.department}
            readOnly
          />
        </label>
        <br />
        <label>
          Program:
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default StudentSignupForm;
