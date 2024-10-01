import DisplayProgram from "./DisplayProgram.component"
export default function DisplayAllPrograms({ programs }) {
    console.log("From DAPC " + JSON.stringify(programs, null, 2));
    return (
        <div className="flex flex-col w-full md:w-4/6 bg-blue-100  shadow-lg gap-8 p-24 border rounded-r-lg">
            {programs.map((program, index) => (
                <DisplayProgram key={index} program={program} />
            ))}
        </div>
    )
}