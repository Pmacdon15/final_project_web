import DisplayMyProgram from "./DisplayMyProgram.component";

export default function MyPrograms({programs, email}) {
    return (
        <div className="flex flex-col w-full md:w-4/6 bg-blue-100  shadow-lg gap-4   p-4 md:p-8 border rounded-lg mb-8">
        {programs.length === 0 ? (
            <div>No data to load</div>
        ) : (
            programs.map((program, index) => (
                <DisplayMyProgram key={index} program={program} email={email} />
            ))
        )}
    </div>
    )
}