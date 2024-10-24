import users from './user.data.json';

// function handleLogin(username, password) {
//     if (!username || !password) {
//         throw new Error('Username and Password should not be empty !');
//     }

//     const userExists = users.find(function (user) {
//         if (user.email === username && user.password === password) {
//             return true;
//         }

//         return false;
//     });

//     if (!userExists) {
//         return false;
//     }

//     //set user information to session storage
//     sessionStorage.setItem(
//         'BVC_Session',
//         JSON.stringify({
//             name: userExists.name,
//             isAdmin: userExists.isAdmin,
//             id: userExists.id,
//             email: userExists.email
//         })
//     );

//     return {
//         name: userExists.name,
//         isAdmin: userExists.isAdmin
//     };
// }
function handleLogin(username, password) {
    if (!username || !password) {
        throw new Error('Username and Password should not be empty!');
    }

    // Get the stored user data from local storage
    const users = JSON.parse(localStorage.getItem('userData')) || [];

    // Check if the user exists
    const userExists = users.find(function (user) {
        return user.email === username && user.password === password;
    });

    if (!userExists) {
        return false; // Invalid credentials
    }

    // Set the user information to session storage
    sessionStorage.setItem(
        'BVC_Session',
        JSON.stringify({
            name: userExists.name,
            isAdmin: userExists.isAdmin,
            id: userExists.id,
            email: userExists.email,
        })
    );

    return {
        name: userExists.name,
        isAdmin: userExists.isAdmin,
    };
}


export default handleLogin;
