// import './App.css';
import ButtonLink from "./ButtonLink"
export default function HomePageMain() {
    return (
        <div className="HomePageMain">
            <h1>Access portal</h1>
            <ButtonLink text="Student" link="/student-login" />
            <ButtonLink text="Admin" link="/admin-login" />
            <ButtonLink text="Guest" link="/guest-login" />
        </div>
    )
}