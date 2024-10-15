export default function DisplayStudentData({students, programs}) {
    return (
        <div className = "flex flex-col w-full shadow-lg border-black items-center bg-white rounded-lg">
            {students.map((student, index) => (
                <div key={index}>
                    <h1 className = "text-2xl font-bold mb-2">{student.firstName} {student.lastName}</h1>
                    <p className="mb-2">ID: {student.id}</p>
                    <p className="mb-2">Email: {student.email}</p>
                    <p className="mb-2">Phone Number: {student.phoneNum}</p>
                    <p className="mb-2">Address: {student.address}</p>
                </div>
            ))}
            
            {/* TODO: Add onclick event to update student personal information*/}
            <button className="flex flex-col m-4 px-4 py-2 w-1.5/6 items-center bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
                Update Personal Information
            </button>
            <h2 className="text-xl font-bold mb-2">Programs: </h2>
            {programs.map((program,index) => (
                <h3 key={index} className="mb-2"> {program.programName}</h3>
            ))}
        </div>
    )

}