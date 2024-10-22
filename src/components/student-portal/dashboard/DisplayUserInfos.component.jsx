import React from 'react';
import { EditUserDataFromLocalStorage } from '../../../placeholders/load-data/loadData.action';

export default function DisplayUserInfos({userInfos, classes, program, onFormAction}) {
    const [isEditing, setIsEditing] = React.useState(false);

    async function handleOnEdit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userName = formData.get('userName');
        const userPhoneNum = formData.get('userPhoneNum');
        const userAddress = formData.get('userAddress');
        console.log("Editing user: ", userName);
        await EditUserDataFromLocalStorage(userInfos.id, userName, userPhoneNum, userAddress, userInfos.email, userInfos.password, userInfos.isAdmin);
        setIsEditing(!isEditing);
        onFormAction(userName);
    }

    return (
        <div className = "flex flex-col w-96 shadow-lg border-black items-center bg-white rounded-lg">
            {isEditing? (
                <div className="flex flex-col h-fit items-center w-full">
                    <form
                        onSubmit={handleOnEdit}
                        className="flex flex-col h-fit items-center w-full">
                        Name: <input type="text"
                            name="userName"
                            defaultValue={userInfos.name}
                            className=" text-center w-5/6 md:w-5/6 border rounded-lg p-2 mb-2"
                        />
                        Phone Number: <input type="text"
                            name="userPhoneNum"
                            defaultValue={userInfos.phoneNum}
                            className=" text-center w-5/6 md:w-5/6 border rounded-lg p-2 mb-2"
                        />
                        Address: <input type="text"
                            name="userAddress"
                            defaultValue={userInfos.address}
                            className=" text-center w-5/6 md:w-5/6 border rounded-lg p-2 mb-2"
                        />
                        <button 
                            className="bg-green-600  my-2 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-green-700"
                            type="submit">
                            Save
                        </button>
                    </form>
                    <button
                        className="bg-red-500  my-2 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-red-700"
                        onClick={() => setIsEditing(!isEditing)}>
                            Cancel
                        </button>
                        </div>
                ) : (
                <div>
                    <h1 className = "text-2xl font-bold mb-2">{userInfos.name}</h1>
                    <p className="mb-2">ID: {userInfos.id}</p>
                    <p className="mb-2">Email: {userInfos.email}</p>
                    <p className="mb-2">Phone Number: {userInfos.phoneNum}</p>
                    <p className="mb-2">Address: {userInfos.address}</p>
                    <button className="flex flex-col m-4 px-4 py-2 w-1.5/6 items-center bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                        onClick={() => setIsEditing(!isEditing)}>
                        Update Personal Information
                    </button>
                    {!userInfos.isAdmin? (
                    <div>
                        <h2 className="text-xl font-bold mb-2">Program </h2>
                        {Array.isArray(classes) && classes.length > 0 ? (
                            <p className="mb-2"> {program.name}</p>
                        ) : (
                            <p className="mb-2">No registered program!</p>
                        )}
                        <h2 className="text-xl font-bold mb-2">Classes </h2>
                        {Array.isArray(classes) && classes.length > 0 ? (
                            classes.map((classItem,index) => (
                                <p key={index} className="mb-2"> {classItem.name}</p>
                            ))
                        ) : (
                                <p className="mb-2">No registered classes!</p>
                        )}
                    </div>) : ("")}
                </div>
                )
            }     
        </div>
    )
}