
import DisplayProgram from "./DisplayProgram.component"

export default function DisplayAllPrograms({ programs ,email}) {
        
    return (
        <div className="flex flex-col w-full md:w-4/6 bg-blue-100  shadow-lg gap-8 p-24 border rounded-r-lg mb-8">
            {programs.map((program, index) => (
                <DisplayProgram key={index} program={program} email={email} />
            ))}
        </div>
    )
}