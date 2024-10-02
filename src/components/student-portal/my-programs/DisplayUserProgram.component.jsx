export default function DisplayUserProgram({ program, email }) {
    return (
        <div className="flex flex-col w-full shadow-lg border-black items-center bg-white rounded-lg">
            <h1 className="text-2xl font-bold mb-2">{program.name}</h1>
            <p className="mb-2">{program.description}</p>
            <p className="mb-2">Amount of terms: {program.durationTerms}</p>
            <p>Tuition: ${program.tuition}</p>
            {/* TODO: Add onClick event to register for classes and drop program redirect to My classes */}
            <button className="flex flex-col m-4 px-4 py-2 w-4/6 items-center bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
                Register for classes
            </button>
            {/* TODO: Add onClick event to drop program and reload page */}
            <button className="flex flex-col m-4 px-4 py-2 w-4/6 items-center bg-red-500 text-white rounded hover:bg-blue-700 transition duration-300">
                Drop Program
            </button>
        </div>
    )
}