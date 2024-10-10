import React from 'react';

function getNextSeason(currentSeason) {
    const seasons = ["Fall", "Winter", "Spring", "Summer"];
    const currentIndex = seasons.indexOf(currentSeason);
    return seasons[(currentIndex + 1) % seasons.length];
}

const TermButtons = ({ userTerms, selectedTerm, setSelectedTerm, setSeason }) => {
    return (
        <div className="flex bg-white p-2 w-full rounded-lg justify-center">
            <p className="mr-auto">Term:</p>
            <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
                {userTerms && userTerms.map((term) => (
                    <button
                        key={term.userTermId}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110 ${selectedTerm && selectedTerm.userTermId === term.userTermId ? 'bg-blue-700' : ''}`}
                        onClick={() => {
                            setSelectedTerm(term);
                            setSeason(term.termSeason);
                        }}
                    >
                        Term {term.userTermId} {term.termSeason}
                    </button>
                ))}
                {userTerms && userTerms.length > 0 && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110"
                        onClick={() => {
                            const lastTerm = userTerms[userTerms.length - 1];
                            const nextTermId = lastTerm.userTermId + 1;
                            const nextTermSeason = getNextSeason(lastTerm.termSeason);
                            console.log("pressed");
                            if (!userTerms.some(term => term.userTermId === nextTermId)) {
                                setSelectedTerm({ userTermId: nextTermId, termSeason: nextTermSeason });
                                setSeason(nextTermSeason);
                            }
                        }}
                    >
                        Term {Number(userTerms[userTerms.length - 1].userTermId )+ 1} {getNextSeason(userTerms[userTerms.length - 1].termSeason)}
                    </button>
                )}
            </div>
        </div>
    );
};

export default TermButtons;
