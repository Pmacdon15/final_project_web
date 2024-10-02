export default function DisplayProgram({ program, email, isMyProgramPage }) {
    console.log("From My DisplayProgram", isMyProgramPage);
    const handleClick = () => {
        window.location.href = `/student-portal-my-programs/${email}`;
    };

    return (
        <div 
            className="flex flex-col w-full shadow-lg border-black items-center bg-white rounded-lg hover:shadow-2xl hover:border-blue-500 transition duration-300"
            onClick={handleClick}
        >
            <h1 className="text-2xl font-bold mb-2">{program.name}</h1>
            <p className="mb-2">{program.description}</p>
            <p className="mb-2">Amount of terms: {program.durationTerms}</p>
            <p>Tuition: {program.tuition}</p>
            {isMyProgramPage &&(
                <button className="flex flex-col m-4 px-4 py-2 w-4/6 items-center bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
                    Register
                </button>
            ) }
        </div>
    );
}