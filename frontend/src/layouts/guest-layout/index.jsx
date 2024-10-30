import NavBar from '../../components/student-portal/nav-bar/NavBar.Component';

export default function StudentLayout({ children }) {
    return (
        <div className="flex flex-col w-full gap-4 justify-center items-center ">
            <NavBar isGuest />
            {children}
        </div>
    );
}
