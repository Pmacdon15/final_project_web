export default function DisplayClass({ classDetails}) {
    return (
        <div className="flex flex-col w-full shadow-lg border-black items-center bg-white rounded-lg">
            
            <h1 className="text-2xl font-bold mb-2">{classDetails.name}</h1>
            {/* <p className="mb-2">{classDetails.description}</p> */}
            <p>Available fall: {classDetails.availableFall ? 'Yes' : 'No'}</p>
        </div>
    )
}