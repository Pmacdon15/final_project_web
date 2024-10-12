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
            <div className="flex flex-col w-full  shadow-lg border-black items-center p-2 bg-white rounded-lg ">
                <div className="flex flex-row justify-between w-full items-center p-2 gap-4">
                    <div className="flex flex-row justify-center border rounded-lg w-full items-center">
                        <h1 className="text-2xl font-bold mb-2 text-center flex-grow">{classDetails.name}</h1>

                    </div>
                    <form
                        onSubmit={handleOnSubmit}
                        className="flex flex-row items-center">
                        <input type="hidden" name="className" value={classDetails.name} />
                        <button className="bg-red-500 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 mr-2 hover:bg-red-700">X</button>
                    </form>
                </div>
                {isEditing ? (
                    <div className="flex flex-col h-fit w-full items-center ">
                        <form className="flex flex-col h-fit items-center w-full">
                            <input type="text"
                                name="className"
                                defaultValue={classDetails.name}
                                className=" text-center w-2/6 border rounded-lg p-2 mb-2"
                            />
                            <textarea
                                name="description"
                                defaultValue={classDetails.description}
                                className=" w-3/6 h-36 border rounded-lg p-2 mb-2" // Increased height
                            />
                            <div className="flex flex-row gap-4">
                                <label htmlFor="availableFall">Available fall:</label>
                                <input type="checkbox" name="availableFall" defaultChecked={classDetails.availableFall} />
                                <label htmlFor="availableSpring">Available Winter:</label>
                                <input type="checkbox" name="availableWinter" defaultChecked={classDetails.availableWinter} />
                                <label htmlFor="availableSpring">Available Spring:</label>
                                <input type="checkbox" name="availableSpring" defaultChecked={classDetails.availableSpring} />
                                <label htmlFor="availableSummer">Available Summer:</label>
                                <input type="checkbox" name="availableSummer" defaultChecked={classDetails.availableSummer} />
                            </div>
                            <button
                                className="bg-green-600 mt-1 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-green-700"
                                type="submit"
                            >
                                Save
                            </button>
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