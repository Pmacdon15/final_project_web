import HomePageMain from './HomePageMain.component';
import BVCImage from '../../bvc-image/BVCImage.component';
import getUserInfo from '../../../utils/get-user-info';
export default function LoginHomePage() {
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
            <BVCImage />
            <HomePageMain />
        </>
    );
}
