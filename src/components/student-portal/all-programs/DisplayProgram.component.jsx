export default function DisplayProgram({ program, isAdmin, onEdit, onDelete}) {
  
    return (
        <div
            className={
                "flex flex-col w-full shadow-lg border-black items-center bg-white rounded-lg hover:shadow-2xl hover:border-blue-500 transition duration-300"
            }
        >
            <h1 className="text-2xl font-bold mb-2">{program.name}</h1>
            <p className="mb-2">{program.description}</p>
            <p className="mb-2">Amount of terms: {program.durationTerms}</p>
            <p>Tuition: ${program.tuition}</p>
            {isAdmin && (
                                <div className="flex gap-4 mt-2">
                                    <button
                                        className="bg-green-600 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-green-700"
                                        onClick={() => onEdit(program)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="bg-red-600 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-red-700"
                                        onClick={() => onDelete(program.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}

        </div>
    );
}