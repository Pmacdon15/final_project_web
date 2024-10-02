// import './App.css';
import ButtonLink from "./ButtonLink"
export default function HomePageMain() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4  w-full md:w-2/6 rounded-lg  text-white bg-blue-500">
            <h1>Access portal</h1>
            <ButtonLink text="Student" link="/student-login" />
            <ButtonLink text="Admin" link="/admin-login" />
            <ButtonLink text="Guest" link="/guest-login" />
        </div>
    )
}