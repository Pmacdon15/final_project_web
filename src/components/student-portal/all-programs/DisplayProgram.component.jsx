export default function DisplayProgram({ program }) {
    // console.log(program)
    return (
        <div className="flex flex-col shadow-lg border-black bg-white rounded-lg hover:shadow-2xl hover:border-blue-500 transition duration-300">
            <h1 className="text-2xl font-bold mb-2">{program.name}</h1>
            <p className="mb-2">{program.programDescription}</p>
            <p className="mb-2">Amount of terms: {program.durationTerms}</p>
            <p>Tuition: {program.tuition}</p>
        </div>
    )
}