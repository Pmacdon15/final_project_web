function getUserInfo() {
    const currentUser = JSON.parse(sessionStorage.getItem('BVC_Session'));

    return currentUser;
}

export default getUserInfo;
