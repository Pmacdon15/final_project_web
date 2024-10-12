import { RemoveClassFromLocalStorage } from "../../../placeholders/load-data/loadData.action";

export default function DisplayClass({ classDetails, isAdmin, onFormAction }) {

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
            <form onSubmit={handleOnSubmit}>
                <div className="flex flex-col w-full shadow-lg border-black items-center p-2 bg-white rounded-lg ">
                    <div className="flex flex-row justify-between w-full items-center">
                        <h1 className="text-2xl font-bold mb-2 text-center flex-grow">{classDetails.name}</h1>
                        <button className="bg-red-500 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-red-700">X</button>
                    </div>
                    <p className="mb-2">{classDetails.description}</p>
                    <p>Available fall: {classDetails.availableFall ? 'Yes' : 'No'}</p>
                    <p>Available winter: {classDetails.availableWinter ? 'Yes' : 'No'}</p>
                    <p>Available spring: {classDetails.availableSpring ? 'Yes' : 'No'}</p>
                    <p>Available summer: {classDetails.availableSummer ? 'Yes' : 'No'}</p>
                </div>
                <input type="hidden" name="className" value={classDetails.name} />
            </form>
        ) : (
            <div className="flex flex-col w-full shadow-lg border-black items-center p-1 bg-white rounded-lg">
                <h1 className="text-2xl font-bold mb-2 text-center">{classDetails.name}</h1>
                <p className="mb-2">{classDetails.description}</p>
                <p>Available fall: {classDetails.availableFall ? 'Yes' : 'No'}</p>
                <p>Available winter: {classDetails.availableWinter ? 'Yes' : 'No'}</p>
                <p>Available spring: {classDetails.availableSpring ? 'Yes' : 'No'}</p>
                <p>Available summer: {classDetails.availableSummer ? 'Yes' : 'No'}</p>
            </div>
        )
    );
}