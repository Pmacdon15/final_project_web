import DisplayUserInfos from './DisplayUserInfos.component.jsx';
import { LoadUserClasses } from '../../../placeholders/load-data/loadData.action.js';
import { LoadUserDataByUsername } from '../../../placeholders/load-data/loadData.action.js';
import { LoadProgramById } from '../../../placeholders/load-data/loadData.action.js';
import { useState, useEffect } from 'react';
import getUserInfo from '../../../utils/get-user-info.js';
import { useCallback } from 'react';

export default function StudentPortalDashBoard() {
  const { username } = getUserInfo();

  const { userData, fetchUserData } = useFetchUserData(username);
  const { userCourses } = useFetchUserCourses(username);
  const { userProgram } = useFetchProgram(userCourses?.[0]?.programId);

  const onFormAction = async () => {
    fetchUserData();
  };

  return (
    <div className='flex flex-col justify-center items-center w-full p-2 gap-8'>
      <div className='bg-blue-100 shadow-lg gap-4 w-3/6 md:w-2/6  p-4 md:p-5 border rounded-lg '>
        <h1 className='text-2xl font-bold mb-2'>My Dashboard</h1>
      </div>
      <DisplayUserInfos userInfos={userData} classes={userCourses} program={userProgram} onFormAction={onFormAction} />
    </div>
  );

}

const useFetchUserData = (username) => {
  const [userData, setUserData] = useState([]);

  const fetchUserData = useCallback(async () => {
    const loadedUsersData = await LoadUserDataByUsername(username);
    setUserData(loadedUsersData);
  }, [username]);

  useEffect(() => {
    fetchUserData();
  }, [username, fetchUserData]);
  return { userData, fetchUserData };
}

const useFetchUserCourses = (username) => {
  const [userCourses, setUserCourses] = useState([]);

  const fetchUserCourses = useCallback(async () => {
    const loadedUserCourses = await LoadUserClasses();
    // const userProgramId = loadedUserClasses.find((userClass) => userClass.userId === username).programId;
    setUserCourses(loadedUserCourses);
    // setUserProgram(userProgramId);
  }, [username]);

  useEffect(() => {
    fetchUserCourses();
  }, [username, fetchUserCourses]);

  return { userCourses };
}

const useFetchProgram = (programId) => {
  const [userProgram, setUserProgram] = useState([]);

  useEffect(() => {
    const fetchProgram = async () => {
      const userProgram = await LoadProgramById();
      setUserProgram(userProgram);
    };
    fetchProgram();
  }, [programId]);

  return { userProgram };
}