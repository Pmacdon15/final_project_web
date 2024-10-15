import { Navigate } from 'react-router-dom';

function StudentRoute({ children }) {
    const currentUser = JSON.parse(sessionStorage.getItem('BVC_Session'));

    if (!currentUser) {
        return <Navigate to="/" />;
    }

    if (!currentUser.isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
}

export default StudentRoute;
