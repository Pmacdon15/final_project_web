import { useState } from "react";
import { EditUserDataFromLocalStorage } from "../../../placeholders/load-data/loadData.action";

export default function DisplayUserAdminInfo({
  userInfos,
  onFormAction,
}) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleOnEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const phone = formData.get("phone");
    const department = formData.get("department");
    const birthday = formData.get("birthday");
    const program = formData.get("program");
    const username = formData.get("username");

    console.log("Editing user:", firstName, lastName);
    await EditUserDataFromLocalStorage(
      userInfos.id,
      firstName,
      lastName,
      phone,
      department,
      userInfos.email,
      userInfos.password,
      birthday,
      program,
      username
    );
    setIsEditing(!isEditing);
    onFormAction();
  }

  return (
    <div className="flex flex-col w-full items-center bg-white">
      {isEditing ? (
        <form
          onSubmit={handleOnEdit}
          className="flex flex-col h-fit items-center border border-black shadow-lg rounded-lg p-4 w-full md:w-2/6"
        >
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            defaultValue={userInfos.firstName}
            className="text-center w-5/6 md:w-5/6 border rounded-lg p-2 mb-2"
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            defaultValue={userInfos.lastName}
            className="text-center w-5/6 md:w-5/6 border rounded-lg p-2 mb-2"
          />
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            defaultValue={userInfos.phone}
            className="text-center w-5/6 md:w-5/6 border rounded-lg p-2 mb-2"
          />
          <label>Department:</label>
          <input
            type="text"
            name="department"
            defaultValue={userInfos.department}
            className="text-center w-5/6 md:w-5/6 border rounded-lg p-2 mb-2"
            readOnly
          />
          <label>Birthday:</label>
          <input
            type="date"
            name="birthday"
            defaultValue={userInfos.birthday}
            className="text-center w-5/6 md:w-5/6 border rounded-lg p-2 mb-2"
          />
          
          <label>Username:</label>
          <input
            type="text"
            name="username"
            defaultValue={userInfos.username}
            className="text-center w-5/6 md:w-5/6 border rounded-lg p-2 mb-2"
          />
          <button
            className="bg-green-600 w-2/6 mt-1 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-green-700"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-red-500 w-2/6 mt-1 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-red-700"
            onClick={() => setIsEditing(!isEditing)}
            type="button"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex flex-col border border-black rounded-lg w-full md:w-2/6">
          <h1 className="text-2xl font-bold mb-2">
            {userInfos.firstName} {userInfos.lastName}
          </h1>
          <p className="mb-2">ID: {userInfos.id}</p>
          <p className="mb-2">Email: {userInfos.email}</p>
          <p className="mb-2">Phone: {userInfos.phone}</p>
          <p className="mb-2">Department: {userInfos.department}</p>
          <p className="mb-2">Birthday: {userInfos.birthday}</p>
          <button
            className="flex flex-col m-4 px-4 py-2 w-1.5/6 items-center bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            onClick={() => setIsEditing(!isEditing)}
          >
            Update Personal Information
          </button>
        </div>
      )}
    </div>
  );
}
