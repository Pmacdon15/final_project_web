import DisplayUserInfos from './DisplayUserInfos.component.jsx';
import {LoadUserClasses} from '../../../placeholders/load-data/loadData.action.js';
import {LoadUserData} from '../../../placeholders/load-data/loadData.action.js';
import { LoadAllPrograms } from '../../../placeholders/load-data/loadData.action.js';
import React from 'react';
import getUserInfo from '../../../utils/get-user-info';

export default function StudentPortalDashBoard() {
    const { email } = getUserInfo();
    console.log("USer email:", email);

    const [userData, setUserData] = React.useState([]);
    const [userClasses, setUserClasses] = React.useState([]);
    const [userProgram, setUserProgram] = React.useState();

    // Fetching users data from local storage and findind current user data through email
    const fetchUserData = async () => {
        const loadedUsersData = LoadUserData();
        const loadedUserData = loadedUsersData.find (student => student.email === email);
        setUserData(loadedUserData);
    };

    React.useEffect(() => {
        fetchUserData();
        const fetchUserClasses = async () => {
            const loadedUserClasses = LoadUserClasses();
            setUserClasses(loadedUserClasses);
            if(userClasses.length > 0)
            {
                const userProgramId = userClasses[0].programId;
                const loadedAllPrograms = LoadAllPrograms();
                setUserProgram(loadedAllPrograms.find (program => program.id === userProgramId));
            }  
        };
        fetchUserClasses();
    }, []);

    const onFormAction = async () => {
        fetchUserData();
    };

    return (
        <div>
            <div className=' bg-blue-100  shadow-lg gap-4   p-4 md:p-5 border rounded-lg '>
                <h1 className='text-2xl font-bold mb-2'>My Dashboard</h1>
            </div>
            <div className="flex flex-col w-full gap-4 justify-center items-center ">
                <DisplayUserInfos userInfos={userData} classes={userClasses} program = {userProgram} onFormAction={onFormAction}/>
            </div>
        </div>
    );
}