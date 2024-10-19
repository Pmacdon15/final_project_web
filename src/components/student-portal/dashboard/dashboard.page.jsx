import DisplayStudentData from './DisplayStudentData.component.jsx';
import {LoadUserClasses} from '../../../placeholders/load-data/loadData.action.js';
import {LoadUserData} from '../../../placeholders/load-data/loadData.action.js';
import React from 'react';
import getUserInfo from '../../../utils/get-user-info';

export default function StudentPortalDashBoard() {
    const { email } = getUserInfo();
    console.log("USer email:", email);

    const [userData, setUserData] = React.useState([]);
    const [userClasses, setUserClasses] = React.useState([]);

    React.useEffect(() => {
        const fetchUserData = async () => {
            const loadedUsersData = LoadUserData();
            const loadedUserData = loadedUsersData.find (student => student.email === email);
            setUserData(loadedUserData);
        };
        fetchUserData();
        const fetchUserClasses = async () => {
            const loadedUserClasses = LoadUserClasses();
            setUserClasses(loadedUserClasses);
        };
        fetchUserClasses();
    }, [email]);

    return (
        <div>
            <div className=' bg-blue-100  shadow-lg gap-4   p-4 md:p-5 border rounded-lg '>
                <h1 className='text-2xl font-bold mb-2'>My Dashboard</h1>
            </div>
            <div className="flex flex-col w-full gap-4 justify-center items-center ">
                <DisplayStudentData student={userData} classes={userClasses}/>
            </div>
        </div>
    );
}