function getUserInfo() {
    const currentUser = JSON.parse(sessionStorage.getItem('BVC_Session'));
    // console.log("Current User:", currentUser);
    return currentUser;
}

export default getUserInfo;
