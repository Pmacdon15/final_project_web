import DisplayUserAdminInfo from './adminUserData.component.jsx';
import { LoadUserClasses } from '../../../placeholders/load-data/loadData.action.js';
import { LoadUserData } from '../../../placeholders/load-data/loadData.action.js';
import { LoadAllPrograms } from '../../../placeholders/load-data/loadData.action.js';
import { useState, useEffect } from 'react';
import getUserInfo from '../../../utils/get-user-info';
import { useCallback } from 'react';

export default function AdminPortalDashBoard() {
  const { email } = getUserInfo();
  console.log("User email:", email);

  const [userData, setUserData] = useState([]);
  const [userClasses, setUserClasses] = useState([]);
  const [userProgram, setUserProgram] = useState();

  // Fetching users data from local storage and find current user data through email

  const fetchUserData = useCallback(async () => {
    const loadedUsersData = await LoadUserData();
    const loadedUserData = loadedUsersData.find(admin => admin.email === email);
    setUserData(loadedUserData);
  }, [email]);

  const fetchUserClasses = useCallback(async () => {
    const loadedUserClasses = await LoadUserClasses();
    const sessionClasses = loadedUserClasses.filter((userClass) => userClass.userId === email);
    setUserClasses(sessionClasses);
    if (sessionClasses.length > 0) { 
      const userProgramId = sessionClasses[0].programId;
      const loadedAllPrograms = await LoadAllPrograms();
      const userProgram = loadedAllPrograms.find((program) => program.id === userProgramId);
      setUserProgram(userProgram);
    }
  }, [email]); // Add email to dependency array

  useEffect(() => {
    fetchUserData();
    fetchUserClasses();
  }, [fetchUserData, fetchUserClasses, email]); // Add email to dependency array

  const onFormAction = async () => {
    fetchUserData();
  };

  return (
    <div className='flex flex-col justify-center items-center w-full p-2 gap-8'>
      <div className='bg-blue-100 shadow-lg gap-4 w-3/6 md:w-2/6  p-4 md:p-5 border rounded-lg '>
        <h1 className='text-2xl font-bold mb-2'>My Dashboard</h1>
      </div>
      <DisplayUserAdminInfo userInfos={userData} classes={userClasses} program={userProgram} onFormAction={onFormAction} />
    </div>
  );

}