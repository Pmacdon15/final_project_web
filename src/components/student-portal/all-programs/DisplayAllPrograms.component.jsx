
import DisplayProgram from "./DisplayProgram.component"

export default function DisplayAllPrograms({ programs ,email, isMyProgramPage}) {
    console.log("From My DisplayAllPrograms", isMyProgramPage);
    return (
        <div className="flex flex-col w-full md:w-4/6 bg-blue-100  shadow-lg gap-4   p-4 md:p-8 border rounded-lg mb-8">
            {programs.map((program, index) => (
                <DisplayProgram key={index} program={program} email={email} isMyProgramPage={isMyProgramPage} />
            ))}
        </div>
    )
}