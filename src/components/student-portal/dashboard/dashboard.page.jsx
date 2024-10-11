import React from 'react';
import NavBar from '../nav-bar/NavBar.Component.jsx';
import { useParams } from 'react-router-dom';

export default function StudentPortalDashBoard() {
    const { email } = useParams();
    console.log("From My Programs", email);
    return (
        <>
            <NavBar email={email}/>
        </>
    )
}