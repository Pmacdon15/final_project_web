import DisplayClass from './DisplayClass.component';
export default function DisplayAllClasses({ allClasses}) {
    // console.log("From component", JSON.stringify(allClasses, null, 2));
    return (        
        <div className="flex flex-col w-full md:w-4/6 bg-blue-100  shadow-lg gap-4   p-4 md:p-8 border rounded-lg mb-8">
            {Array.isArray(allClasses) && allClasses.map((classDetails, index) => (
                <DisplayClass key={index} classDetails={classDetails} />
            ))}
        </div>
    )
}