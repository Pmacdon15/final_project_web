export default function DisplayProgram({ program, email}) {
    
    const handleClick = () => {
        window.location.href = `/student-portal-my-programs/${email}`;
    };

    return (
        <div 
            className="flex flex-col shadow-lg border-black bg-white rounded-lg hover:shadow-2xl hover:border-blue-500 transition duration-300"
            onClick={handleClick}
        >
            <h1 className="text-2xl font-bold mb-2">{program.name}</h1>
            <p className="mb-2">{program.description}</p>
            <p className="mb-2">Amount of terms: {program.durationTerms}</p>
            <p>Tuition: {program.tuition}</p>
        </div>
    );
}