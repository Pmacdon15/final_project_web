export default function FirstSeasonSelector({ setSeason, setSelectedTerm, setUserTerms }) {
    return (
        <div className="flex bg-white p-2 w-full rounded-lg justify-center">
            <p className="mr-auto">First Term Season:</p>
            <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
                {["Fall", "Winter", "Spring", "Summer"].map(season => (
                    <button
                        key={season}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110"
                        onClick={() => {
                            setSeason(season);
                            setSelectedTerm({ userTermId: 1, termSeason: season });
                            setUserTerms([{ userTermId: 1, termSeason: season }]);
                        }}
                    >
                        {season}
                    </button>
                ))}
            </div>
        </div>
    )
}