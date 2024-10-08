export default function DisplayAvailableClasses({ filteredClasses, email }) {
    return (
        <div className="bg-blue-300 w-5/6 min-h-fit flex flex-row flex-wrap gap-8 p-4 justify-center overflow-y-auto max-h-96 rounded-lg">
            {Array.isArray(filteredClasses) && filteredClasses.length > 0 ? (
                filteredClasses.map((classDetails, index) => (
                    <div key={index} className="flex flex-row flex-wrap w-5/6 md:w-2/6 shadow-lg border-black items-center p-1 bg-white rounded-lg">
                        <h1 className="text-2xl font-bold mb-2">{classDetails.name}</h1>
                        <p className="mb-2">{classDetails.description}</p>
                        <form className="mx-auto">
                            <input type="hidden" name="classId" value={classDetails.id} />
                            <input type="hidden" name="termId" value={classDetails.termId} />
                            <input type="hidden" name="season" value={classDetails.season} />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110" type="submit">Enroll</button>
                        </form>
                    </div>
                ))
            ) : (
                <p>Please select a term to view available classes.</p>
            )}
        </div>
    )
}