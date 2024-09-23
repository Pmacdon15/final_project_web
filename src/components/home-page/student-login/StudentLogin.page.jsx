import '../../App.css';
export default function StudentLogin() {
    return (
        <div className="HomePageMain">
            <h1>Student Login</h1>
            <form>
                <label>
                    Username:
                    <input type="text" name="studentId" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}