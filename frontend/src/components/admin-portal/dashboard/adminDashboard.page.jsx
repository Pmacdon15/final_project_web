import DisplayUserAdminInfo from './adminUserData.component.jsx';
import { LoadUserDataByUsername } from '../../../placeholders/load-data/loadData.action.js';
import { useState, useEffect } from 'react';
import getUserInfo from '../../../utils/get-user-info.js';
import { useCallback } from 'react';


export default function AdminPortalDashBoard() {

  const { userData, fetchUserData } = useFetchUserData([]);

  const onFormAction = async () => {
    fetchUserData();
  };

  return (
    <div className='flex flex-col justify-center items-center w-full p-2 gap-8'>
      <div className='bg-blue-100 shadow-lg gap-4 w-3/6 md:w-2/6  p-4 md:p-5 border rounded-lg '>
        <h1 className='text-2xl font-bold mb-2'>My Dashboard</h1>
      </div>
      {userData &&
        <DisplayUserAdminInfo userInfos={userData} onFormAction={onFormAction} />
      }
    </div>
  );

}

const useFetchUserData = () => {
  const [userData, setUserData] = useState([]);
  const { username } = getUserInfo();

  const fetchUserData = useCallback(async () => {
    const loadedUsersData = await LoadUserDataByUsername(username);
    setUserData(loadedUsersData);
  }, [username]);

  useEffect(() => {
    fetchUserData();
  }, [username, fetchUserData]);
  return { userData, fetchUserData };
}
