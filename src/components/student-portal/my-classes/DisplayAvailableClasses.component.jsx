import { AddToUserClasses } from '../../../placeholders/load-data/loadData.action';
export default function DisplayAvailableClasses({ filteredClasses, email, termId, season }) {

    async function handleOnSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const classId = formData.get('classId');
        const userId = formData.get('userId');
        const programId = formData.get('programId');
        const name = formData.get('name');
        const description = formData.get('description');
        const userTermId = formData.get('userTermId');
        const termSeason = formData.get('termSeason');

        // Call the action to add the class
        await AddToUserClasses(userId, classId, programId, name, description, userTermId, termSeason);

        // Create a new class object to add to user classes
        const newClass = { id: classId, name, description, userTermId, termSeason };        
    }

    return (
        <>
            <h1 className="text-2xl">Available classes:</h1>
            <div className="bg-blue-300 w-5/6  flex flex-row flex-wrap gap-8 p-4 justify-center overflow-y-auto max-h-[500px] rounded-lg">
                {Array.isArray(filteredClasses) && filteredClasses.length > 0 ? (
                    filteredClasses.map((classDetails, index) => (
                        <div key={index} className="flex flex-row flex-wrap w-5/6 md:w-2/6 shadow-lg border-black items-center p-1 bg-white rounded-lg">
                            <h1 className="text-2xl font-bold mb-2">{classDetails.name}</h1>
                            <p className="mb-2">{classDetails.description}</p>
                            <form onSubmit={handleOnSubmit} className="mx-auto">
                                <input type="hidden" name="userId" value={email} />
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
        </>
    )
}