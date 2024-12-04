import { DropUserClass } from "../../../placeholders/load-data/loadData.action";
export default function DisplayUserClasses({ userClasses = [], username, termId, season, onDropClass }) {
    console.log('User name: ', username);
    async function handleOnSubmit(event) {
        event.preventDefault();
        const classId = event.target.classId.value;
        const username = event.target.username.value;
        // console.log("username", username);
        const userTermId = event.target.userTermId.value;
        const termSeason = event.target.termSeason.value;


        await DropUserClass(username, classId);
        console.log('Dropped class', username, classId);
        console.log('User term id', userTermId, termSeason);
        onDropClass(userTermId, termSeason);
    }

    return (
        <div className='flex flex-col w-full h-full md:w-3/6'>
            <h1 className="text-2xl text-center">User classes:</h1>
            <div className="bg-blue-300 w-full flex flex-row flex-wrap gap-8 p-4 justify-center overflow-y-auto h-full rounded-lg">
                {Array.isArray(userClasses) && userClasses.length > 0 ? (
                    userClasses.map((classDetails, index) => (
                        <div key={index} className="flex flex-row flex-wrap w-full md:w-[300px] h-auto min-h-fit shadow-lg border-black items-center p-1 bg-white rounded-lg">
                            <h1 className="flex text-2xl font-bold mb-2 w-full justify-center">{classDetails.name}</h1>
                            <p className="mb-2">{classDetails.description}</p>
                            <form onSubmit={handleOnSubmit} className="mx-auto">
                                <input type="hidden" name="classId" value={classDetails.courseId} />
                                <input type="hidden" name="username" value={username} />
                                <input type="hidden" name="userTermId" value={termId} />
                                <input type="hidden" name="termSeason" value={season} />
                                <button className="bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hover:scale-110" type="submit">Drop</button>
                            </form>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-xl">No registered classes!</p>
                )}
            </div>
        </div>
    );
}
