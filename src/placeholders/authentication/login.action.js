import users from './user.data.json'

function handleLogin(username, password) {
    if (!username || !password) {
        throw new Error('Username and Password should not be empty !')
    }

    const userExists = users.find(function (user) {
        if (user.email === username && user.password === password) {
            return true
        }

        return false
    })

    if (!userExists) {
        return false
    }

    return {
        name: userExists.name,
        isAdmin: userExists.isAdmin
    }
}

export default handleLogin
