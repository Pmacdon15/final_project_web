import '../../App.css';
import BVCImage from "../bvc-image/BVCImage.component";

export default function StudentPortalHome() {
    return (
        <>
            <div className='StudentPortalHomeHeader'>
                <div className='StudentPortalHomeHeaderImage'>
                    <BVCImage />
                </div>
                <h1 className='StudentPortalHeaderH1'>Student Portal</h1>
            </div>
            <div className="StudentPortalNavBar">
                <ul>
                    <li>DashBoard</li>
                    <li>View Profile</li>
                    <li>Courses</li>
                    <li>My Courses</li>
                    <li>Contact Us</li>
                </ul>
            </div>
        </>
    )
}