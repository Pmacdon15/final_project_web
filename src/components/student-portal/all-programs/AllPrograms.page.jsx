import '../../../App.css';
import NavBar from '../nav-bar/NavBar.Component';
import DisplayAllPrograms from './DisplayAllPrograms.component';
import LoadAllPrograms from '../../../placeholders/load-data/loadData.action';

export default function StudentPortalAllPrograms() {

    const programs = LoadAllPrograms();
    console.log("From page", JSON.stringify(programs, null, 2));
    return (
        <div className="flex flex-col w-full gap-4 justify-center items-center ">
            <NavBar />
            <h1>All Programs</h1>
            <p>Here you can see all the programs available for you to enroll in.</p>
            <DisplayAllPrograms programs={programs} />
        </div>
    )
}