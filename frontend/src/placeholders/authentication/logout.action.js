function handleLogout() {
    
 // Make a POST request to the backend logout route
 return fetch('http://localhost:5000/api/v1/auth/logout', {
    method: 'POST',
    credentials: 'include', // Include cookies (JWT) with the request
})
.then((response) => {
    if (response.ok) {
        // If the response is successful, remove the session storage and handle the logout
        sessionStorage.removeItem('BVC_Session');
        return true;
    } else {
        throw new Error('Logout failed');
    }
})
.catch((error) => {
    console.error('Error during logout:', error);
    return false;
});
}

export default handleLogout;
