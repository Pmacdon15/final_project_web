import NavBar from '../nav-bar/NavBar.Component';
import DisplayAllPrograms from '../all-programs/DisplayAllPrograms.component';
import LoadAllPrograms from '../../../placeholders/load-data/loadData.action';
import { useParams } from 'react-router-dom';

export default function StudentPortalMyPrograms() {
    const { email } = useParams();
    //   console.log("From My Programs", email);

    const programs = LoadAllPrograms();
    //   console.log("From page", JSON.stringify(programs, null, 2));

    //   console.log("From My Programs", isMyProgramsPage);
    return (
    <div className="flex flex-col w-full gap-4 justify-center items-center ">
      <NavBar email={email}/>
      <div className=' bg-blue-100  shadow-lg gap-4   p-4 md:p-8 border rounded-lg '>
      <h1>My Programs</h1>
      <p>Here you can see all the programs available for you to enroll in as well as the programs you are enrolled in.</p>
      </div>
      <DisplayAllPrograms programs={programs} email={email} isMyProgramPage={true}/>
    </div >
  );
}