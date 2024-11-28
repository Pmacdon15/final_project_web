
async function handleLogin(username, password) {
    if (!username || !password) {
        throw new Error('Username and Password should not be empty !');
    }

    console.log(username, password);
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
