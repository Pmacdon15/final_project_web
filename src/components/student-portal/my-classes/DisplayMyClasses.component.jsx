export default function DisplayClass({ filteredClasses }) {
    console.log("From component", filteredClasses);
    return (
        <div className="w-full flex flex-row flex-wrap gap-8 justify-center overflow-y-auto max-h-96">
            {Array.isArray(filteredClasses) && filteredClasses.map((classDetails, index) => (
                <div key={index} className="flex flex-row flex-wrap w-5/6 md:w-2/6 shadow-lg border-black items-center p-1 bg-white rounded-lg">
                    <h1 className="text-2xl font-bold mb-2">{classDetails.name}</h1>
                    <p className="mb-2">{classDetails.description}</p>
                    <form className="mx-auto">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110" type="submit">Enroll</button>
                    </form>
                </div>
            ))}
        </div>
    )
}