import {
  RemoveCourse,
  EditCourse,
} from "../../../placeholders/load-data/loadData.action";
import { useState } from "react";

export default function DisplayClass({ classDetails, isAdmin, onFormAction }) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleOnRemove(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const classId = Number(formData.get("classId")); // Convert to number
    const className = formData.get("className");
    console.log("Removing class: ", className);
    await RemoveCourse(classId);
    onFormAction(className);
  }
  console.log(JSON.stringify(classDetails))
  async function handleOnEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const classId = formData.get("classId");
    const programId = classDetails.programId;
    const className = formData.get("className");
    const description = formData.get("description");
    const availableFall = formData.get("availableFall");
    const availableWinter = formData.get("availableWinter");
    const availableSpring = formData.get("availableSpring");
    const availableSummer = formData.get("availableSummer");
    console.log("Editing class: ", className);
    await EditCourse(
      classId,
      programId,
      className,
      description,
      availableFall,
      availableWinter,
      availableSpring,
      availableSummer
    );
    setIsEditing(!isEditing);
    onFormAction(className);
  }

  return isAdmin ? (
    <div className="flex flex-col w-full  shadow-lg border-black items-center p-2 bg-white rounded-lg ">
      <div className="flex flex-row justify-between w-full items-center p-2 gap-4">
        <div className="flex flex-row justify-center border rounded-lg w-full items-center">
          <h1 className="text-2xl font-bold mb-2 text-center flex-grow">
            {classDetails.name}
          </h1>
        </div>
        <form onSubmit={handleOnRemove} className="flex flex-row items-center">
          <input type="hidden" name="classId" value={classDetails.id} />
          <input type="hidden" name="className" value={classDetails.name} />
          <button className="bg-red-500 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 mr-2 hover:bg-red-700">
            X
          </button>
        </form>
      </div>
      {isEditing ? (
        <div className="flex flex-col h-fit w-full items-center ">
          <form
            onSubmit={handleOnEdit}
            className="flex flex-col h-fit items-center w-full"
          >
            <input
              type="text"
              name="className"
              defaultValue={classDetails.name}
              className=" text-center w-5/6 md:w-2/6 border rounded-lg p-2 mb-2"
            />
            <textarea
              name="description"
              defaultValue={classDetails.description}
              className="w-5/6 md:w-3/6 h-36 border rounded-lg p-2 mb-2" // Increased height
            />
            <div className="flex flex-col md:flex-row gap-4">
              <label htmlFor="availableFall">Available fall:</label>
              <input
                type="checkbox"
                name="availableFall"
                defaultChecked={classDetails.availableFall}
              />
              <label htmlFor="availableSpring">Available Winter:</label>
              <input
                type="checkbox"
                name="availableWinter"
                defaultChecked={classDetails.availableWinter}
              />
              <label htmlFor="availableSpring">Available Spring:</label>
              <input
                type="checkbox"
                name="availableSpring"
                defaultChecked={classDetails.availableSpring}
              />
              <label htmlFor="availableSummer">Available Summer:</label>
              <input
                type="checkbox"
                name="availableSummer"
                defaultChecked={classDetails.availableSummer}
              />
            </div>
            <button
              className="bg-green-600 mt-1 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-green-700"
              type="submit"
            >
              Save
            </button>
            <input type="hidden" name="classId" value={classDetails.id} />
          </form>
          <button
            className="bg-red-500 mt-1 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-red-700"
            onClick={() => setIsEditing(!isEditing)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center">
          <p className="text-xl font-bold mb-2">Course Description</p>
          <p className="text-justify mb-2">{classDetails.description}</p>
          <p className="text-xl font-bold mb-2">
            Program ID :{" "}
            <spam className="text-xl font-normal mb-2">
              {classDetails.programId}
            </spam>
          </p>
          <p className="text-xl font-bold mb-2">Availability</p>

          {classDetails.availableFall !== 0 && (
            <p className="font-bold mb-2">
              Fall: <spam className="text-xl font-normal mb-2">Yes</spam>
            </p>
          )}
          {classDetails.availableWinter !== 0 && (
            <p className="font-bold mb-2">
              Winter: <spam className="text-xl font-normal mb-2">Yes</spam>
            </p>
          )}
          {classDetails.availableSpring !== 0 && (
            <p className=" font-bold mb-2">
              Spring: <spam className="text-xl font-normal mb-2">Yes</spam>
            </p>
          )}
          {classDetails.availableSummer !== 0 && (
            <p className="font-bold mb-2">
              Summer: <spam className="text-xl font-normal mb-2">Yes</spam>
            </p>
          )}
          <button
            className="bg-blue-500 mt-1 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-blue-700"
            onClick={() => setIsEditing(!isEditing)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-col w-full shadow-lg border-black items-center p-1 bg-white rounded-lg">
      <div className="flex flex-row justify-center border rounded-lg w-full items-center">
        <h1 className="text-2xl font-bold mb-2 text-center">
          {classDetails.name}
        </h1>
      </div>
      <p className="text-justify mb-2">{classDetails.description}</p>
      <p className="text-xl font-bold mb-2">Availability</p>

      {classDetails.availableFall !== 0 && (
        <p className="font-bold mb-2">
          Fall: <spam className="text-xl font-normal mb-2">Yes</spam>
        </p>
      )}
      {classDetails.availableWinter !== 0 && (
        <p className="font-bold mb-2">
          Winter: <spam className="text-xl font-normal mb-2">Yes</spam>
        </p>
      )}
      {classDetails.availableSpring !== 0 && (
        <p className=" font-bold mb-2">
          Spring: <spam className="text-xl font-normal mb-2">Yes</spam>
        </p>
      )}
      {classDetails.availableSummer !== 0 && (
        <p className="font-bold mb-2">
          Summer: <spam className="text-xl font-normal mb-2">Yes</spam>
        </p>
      )}
    </div>
  );
}
