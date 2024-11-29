
async function handleLogin(username, password) {
    if (!username || !password) {
        throw new Error('Username and Password should not be empty !');
    }
    
    try {
        const login = await fetch('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username, "password": password }),
            credentials: 'include'
        });

        const responseData = await login.json();
        sessionStorage.setItem('BVC_Session', JSON.stringify({ firstName: responseData.user.username, isAdmin: responseData.user.isAdmin }));        
        
        return {
            name: responseData.user.username,
            isAdmin: responseData.user.isAdmin
        };

        // console.log(response);
    } catch (error) {
        console.log(error);
    }



}

export default handleLogin;
