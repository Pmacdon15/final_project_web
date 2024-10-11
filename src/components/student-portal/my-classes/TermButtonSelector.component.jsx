import React from 'react';

// Function to get the next season
function getNextSeason(currentSeason) {
    const seasons = ["Fall", "Winter", "Spring", "Summer"];
    const currentIndex = seasons.indexOf(currentSeason);
    return seasons[(currentIndex + 1) % seasons.length];
}

// Function to get the current season based on term ID
function getCurrentSeason(termId, maxTermId, lastTermSeason) {
    const seasons = ["Fall", "Winter", "Spring", "Summer"];
    const seasonIndex = seasons.indexOf(lastTermSeason);
    const termDiff = maxTermId - termId;
    return seasons[(seasonIndex - termDiff + seasons.length) % seasons.length];
}

const TermButtons = ({ userTerms = [], selectedTerm, setSelectedTerm, setSeason }) => {
    // Sort user terms by userTermId
    const sortedUserTerms = [...userTerms].sort((a, b) => a.userTermId - b.userTermId);
    // Determine the maximum term ID to iterate through
    const maxTermId = sortedUserTerms.length > 0 ? Math.max(...sortedUserTerms.map(term => term.userTermId)) : 0;
    const lastTerm = sortedUserTerms[sortedUserTerms.length - 1]; // Use last term from sorted array

    return (
        <div className="flex bg-white p-2 w-full rounded-lg justify-center">
            <p className="mr-auto">Term:</p>
            <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
                {/* Create buttons for all term IDs up to the maximum term ID */}
                {[...Array(maxTermId)].map((_, index) => {
                    const termId = index + 1; // Term IDs start from 1
                    const term = sortedUserTerms.find(term => term.userTermId === termId); // Use sorted array
                    const termSeason = term ? term.termSeason : getCurrentSeason(termId, maxTermId, lastTerm.termSeason);
                    return (
                        <button
                            key={termId}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110 ${selectedTerm && selectedTerm.userTermId === termId ? 'bg-blue-700' : ''}`}
                            onClick={() => {
                                if (term) {
                                    setSelectedTerm(term);
                                    setSeason(term.termSeason);
                                } else {
                                    setSelectedTerm({ userTermId: termId, termSeason });
                                    setSeason(termSeason);
                                }
                            }}
                        >
                            Term {termId} {term ? term.termSeason : `${termSeason}`}
                        </button>
                    );
                })}

                {/* Button to add the next term */}
                {sortedUserTerms.length > 0 && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110"
                        onClick={() => {
                            const nextTermId = lastTerm.userTermId + 1;
                            const nextTermSeason = getNextSeason(lastTerm.termSeason);
                            console.log("pressed");
                            if (!sortedUserTerms.some(term => term.userTermId === nextTermId)) {
                                setSelectedTerm({ userTermId: nextTermId, termSeason: nextTermSeason });
                                setSeason(nextTermSeason);
                            }
                        }}
                    >
                        Term {Number(lastTerm.userTermId) + 1} {getNextSeason(lastTerm.termSeason)}
                    </button>
                )}
            </div>
        </div>
    );
};

export default TermButtons;