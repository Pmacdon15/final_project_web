import React from 'react';
import { LoadAllPrograms } from "../../../placeholders/load-data/loadData.action"


export default function DisplayUserInfos({userInfos, classes}) {
    const [allPrograms, setAllPrograms] = React.useState([]);

    React.useEffect(() => {
    const fetchAllPrograms = async () => {
        const loadedAllPrograms = LoadAllPrograms();
        setAllPrograms(loadedAllPrograms);
    };
    fetchAllPrograms();
    }, []);
    
    return (
        <div className = "flex flex-col w-full shadow-lg border-black items-center bg-white rounded-lg">
            <h1 className = "text-2xl font-bold mb-2">{userInfos.name}</h1>
            <p className="mb-2">ID: {userInfos.id}</p>
            <p className="mb-2">Email: {userInfos.email}</p>
            <p className="mb-2">Phone Number: {userInfos.phoneNum}</p>
            <p className="mb-2">Address: {userInfos.address}</p>
            
            {/* TODO: Add onclick event to update user personal information*/}
            <button className="flex flex-col m-4 px-4 py-2 w-1.5/6 items-center bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
                Update Personal Information
            </button>
            {!userInfos.isAdmin? (
                <div>
                <h2 className="text-xl font-bold mb-2">Program </h2>
                <h2 className="text-xl font-bold mb-2">Classes </h2>
                {Array.isArray(classes) && classes.length > 0 ? (
                    classes.map((classItem,index) => (
                        <h3 key={index} className="mb-2"> {classItem.name}</h3>
                    ))
                ) : (
                    <p className="mb-2">No registered classes!</p>
                )}
                </div>) : ("")}
                
        </div>
    )
}