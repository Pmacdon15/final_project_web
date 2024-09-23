import '../../../App.css';
import BVCImage
    from '../../bvc-image/BVCImage.component';
export default function StudentLogin() {
    return (
        <>
            <BVCImage />
            <div className="HomePageMain">
                <h1>Student Login</h1>
                <form className='LoginForm'>
                    <label>
                        Student Number:
                        <input type="text" name="studentId" />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    )
}