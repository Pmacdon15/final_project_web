import '../../../App.css';
import NavBar from '../nav-bar/NavBar.Component';
import DisplayAllPrograms from './DisplayAllPrograms.component';
import { LoadAllPrograms } from '../../../placeholders/load-data/loadData.action';
import React from 'react';
import { useEffect , useState} from 'react';
import { useParams } from 'react-router-dom';


export default function StudentPortalAllPrograms() {
    const { email } = useParams();
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        const fetchPrograms = async () => {
            const loadedPrograms = LoadAllPrograms();
            setPrograms(loadedPrograms);
        };

        fetchPrograms();
    }, []);

    // console.log("From page", JSON.stringify(programs, null, 2));
    return (
        <div className="flex flex-col w-full gap-4 justify-center items-center ">
            <NavBar email={email} />
            <div className=' bg-blue-100  shadow-lg gap-4  p-4 md:p-8 border rounded-lg'>
                <h1>All Programs</h1>
                <p>Here you can see all the programs available for you to enroll in.</p>
            </div>
            <DisplayAllPrograms programs={programs} email={email}  />
        </div>
    )
}