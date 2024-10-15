import NavBar from '../nav-bar/NavBar.Component.jsx';
import DisplayStudentData from './DisplayStudentData.component.jsx';
import {LoadUserPrograms} from '../../../placeholders/load-data/loadData.action.js';
import {LoadUserInfos} from '../../../placeholders/load-data/loadData.action.js';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function StudentPortalDashBoard() {
    const { email } = useParams();
    console.log("From My Programs", email);

    const [userPrograms, setUserPrograms] = React.useState([]);
    const [userInfos, setUserInfos] = React.useState([]);

    React.useEffect(() => {
        const fetchPrograms = async () => {
            const loadedUserPrograms = LoadUserPrograms(email);
            setUserPrograms(loadedUserPrograms);
        };
        fetchPrograms();
        const fetchUserInfos = async () => {
            const loadedUserInfos = LoadUserInfos(email);
            setUserInfos(loadedUserInfos);
        };
        fetchUserInfos();
    }, [email]);

    return (
        <div className="flex flex-col w-full gap-4 justify-center items-center ">
            <NavBar email={email}/>
            <div className=' bg-blue-100  shadow-lg gap-4   p-4 md:p-5 border rounded-lg '>
                <h1 className='text-2xl font-bold mb-2'>My Dashboard</h1>
            </div>
            <DisplayStudentData programs={userPrograms} students={userInfos}/>
        </div>
    );
}