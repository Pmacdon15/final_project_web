import { AddToUserCourses } from '../../../placeholders/load-data/loadData.action';
export default function DisplayAvailableClasses({ filteredClasses, username, termId, season, onAddClass }) {

    async function handleOnSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const classId = formData.get('classId');
        const username = formData.get('userId');
        const programId = formData.get('programId');
        const name = formData.get('name');
        const description = formData.get('description');
        const userTermId = formData.get('userTermId');
        const termSeason = formData.get('termSeason');

        // Call the action to add the class
        await AddToUserCourses(username, classId, programId, name, description, userTermId, termSeason);
        onAddClass(userTermId, termSeason);     
    }

    return (
        <div className='flex flex-col w-full h-full items-center md:w-3/6'>
            <h1 className="text-2xl">Available classes:</h1>
            <div className="bg-blue-300 w-full flex flex-row h-full flex-wrap gap-8 p-4 justify-center overflow-y-auto  rounded-lg">
                {Array.isArray(filteredClasses) && filteredClasses.length > 0 ? (
                    filteredClasses.map((classDetails, index) => (
                        <div key={index} className="flex flex-row flex-wrap w-full md:w-[300px] h-auto min-h-fit shadow-lg border-black items-center p-1 bg-white rounded-lg">
                            <h1 className="flex text-2xl font-bold mb-2">{classDetails.name}</h1>
                            <p className="mb-2">{classDetails.description}</p>
                            <form onSubmit={handleOnSubmit} className="flex mx-auto">
                                <input type="hidden" name="username" value={username} />
                                <input type="hidden" name="classId" value={classDetails.id} />
                                <input type="hidden" name="programId" value={1} />
                                <input type="hidden" name="name" value={classDetails.name} />
                                <input type="hidden" name="description" value={classDetails.description} />
                                <input type="hidden" name="userTermId" value={termId} />
                                <input type="hidden" name="termSeason" value={season} />
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110" type="submit">Enroll</button>
                            </form>
                        </div>
                    ))
                ) : (
                    <p>Please select a term to view available classes.</p>
                )}
            </div>
        </div>
    )
}