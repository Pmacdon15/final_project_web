import { RemoveClassFromLocalStorage } from "../../../placeholders/load-data/loadData.action";
import { useState } from 'react';
export default function DisplayClass({ classDetails, isAdmin, onFormAction }) {
    const [isEditing, setIsEditing] = useState(false);
    async function handleOnSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const className = formData.get('className');
        console.log("Removing class: ", className);
        await RemoveClassFromLocalStorage(className);
        onFormAction(className);
    }

    return (
        isAdmin ? (
            <div className="flex flex-col w-full shadow-lg border-black items-center p-2 bg-white rounded-lg ">
                <div className="flex flex-row justify-between w-full items-center">
                    <div className="flex flex-row justify-between w-full items-center">
                        <h1 className="text-2xl font-bold mb-2 text-center flex-grow">{classDetails.name}</h1>
                        <form
                            onSubmit={handleOnSubmit}
                            className="flex flex-row items-center">
                            <input type="hidden" name="className" value={classDetails.name} />
                            <button className="bg-red-500 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-red-700">X</button>
                        </form>
                    </div>
                </div>
                {isEditing ? (
                    <div className="flex flex-col w-full items-center">
                        <p>Test</p>
                        <button
                            className="bg-red-500 mt-1 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-red-700"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col w-full items-center">
                        <p className="mb-2">{classDetails.description}</p>
                        <p>Available fall: {classDetails.availableFall ? 'Yes' : 'No'}</p>
                        <p>Available winter: {classDetails.availableWinter ? 'Yes' : 'No'}</p>
                        <p>Available spring: {classDetails.availableSpring ? 'Yes' : 'No'}</p>
                        <p>Available summer: {classDetails.availableSummer ? 'Yes' : 'No'}</p>
                        <button className="bg-blue-500 mt-1 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-blue-700"
                            onClick={() => setIsEditing(!isEditing)}>
                            Edit
                        </button>
                    </div>
                )}
            </div >

        ) : (
            <div className="flex flex-col w-full shadow-lg border-black items-center p-1 bg-white rounded-lg">
                <div className="flex flex-row justify-center border rounded-lg w-full items-center">
                    <h1 className="text-2xl font-bold mb-2 text-center">{classDetails.name}</h1>
                </div>
                <p className="mb-2">{classDetails.description}</p>
                <p>Available fall: {classDetails.availableFall ? 'Yes' : 'No'}</p>
                <p>Available winter: {classDetails.availableWinter ? 'Yes' : 'No'}</p>
                <p>Available spring: {classDetails.availableSpring ? 'Yes' : 'No'}</p>
                <p>Available summer: {classDetails.availableSummer ? 'Yes' : 'No'}</p>
            </div>
        )
    );
}