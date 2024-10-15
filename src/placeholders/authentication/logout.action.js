function handleLogout() {
    sessionStorage.removeItem('BVC_Session');

    const sessionExists = sessionStorage.getItem('BVC_Session');

    return !sessionExists;
}

export default handleLogout;
