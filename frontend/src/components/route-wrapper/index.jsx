import { Navigate } from 'react-router-dom';

import AdminLayout from '../../layouts/admin-layout';
import StudentLayout from '../../layouts/student-layout';
import GuestLayout from '../../layouts/guest-layout';

function RouteWrapper({ children, adminOnly = false, isGuest = false }) {
    const currentUser = JSON.parse(sessionStorage.getItem('BVC_Session'));

    if (!currentUser && !isGuest) {
        return <Navigate to="/" />;
    }

    if (!currentUser && isGuest) {
        return <GuestLayout>{children}</GuestLayout>;
    }

    if (!currentUser.isAdmin && adminOnly) {
        return <Navigate to="/not-allowed" />;
    }
    if (!currentUser.isAdmin) {
        return <StudentLayout>{children}</StudentLayout>;
    }

    return <AdminLayout>{children}</AdminLayout>;
}

export default RouteWrapper;
