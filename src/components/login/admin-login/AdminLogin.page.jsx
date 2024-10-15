import getUserInfo from '../../../utils/get-user-info';
import LoginForm from '../LoginForm.component';

export default function AdminLogin() {
    const currentUser = getUserInfo();

    //Prevent authenticated user from accessing this page
    if (currentUser) {
        if (currentUser.isAdmin) {
            window.location.href = '/admin/dashboard';
            return;
        }

        window.location.href = '/student/dashboard';
    }
    return (
        <>
            <LoginForm loginType={'Admin'} />
        </>
    );
}
