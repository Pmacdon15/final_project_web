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


function getLastSeason(userTerms) {
    const lastTerm = userTerms[userTerms.length - 1];
    return lastTerm ? lastTerm.termSeason : 'Fall';
}


const TermButtons = ({ userTerms = [], setUserTerms, selectedTerm, setSelectedTerm, setSeason }) => {
    // Sort user terms by userTermId
    const sortedUserTerms = [...userTerms].sort((a, b) => a.userTermId - b.userTermId);
    const maxTermId = sortedUserTerms.length > 0 ? Math.max(...sortedUserTerms.map(term => term.userTermId)) : 0;

    const handleAddTerm = () => {
        // Calculate the next season based on the current sorted user terms, not on userTerms state
        const lastTermSeason = getLastSeason(sortedUserTerms); // Get last season from sorted terms
        const nextTermSeason = getNextSeason(lastTermSeason);  // Calculate the next season
        const nextTermId = maxTermId + 1;
        const newTerm = { userTermId: nextTermId, termSeason: nextTermSeason };

        // Update userTerms using the setState function
        const updatedTerms = [...sortedUserTerms, newTerm]; // Create a new array with the new term
        setUserTerms(updatedTerms); // Update the userTerms state  
        setSelectedTerm(newTerm);
        setSeason(nextTermSeason);
    };

    const handleTermClick = (termId) => {
        const term = sortedUserTerms.find(term => term.userTermId === termId);
        const termSeason = term ? term.termSeason : getCurrentSeason(termId, maxTermId, getLastSeason(sortedUserTerms));

        setSelectedTerm(term || { userTermId: termId, termSeason });
        setSeason(termSeason);
    };

    return (
        <div className="flex bg-white p-2 w-full rounded-lg justify-center">
            <p className="mr-auto">Term:</p>
            <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
                {/* Create buttons for all term IDs up to the maximum term ID */}
                {[...Array(maxTermId)].map((_, index) => {
                    const termId = index + 1;
                    return (
                        <button
                            key={termId}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110 ${selectedTerm && selectedTerm.userTermId === termId ? 'bg-blue-700' : ''
                                }`}
                            onClick={() => handleTermClick(termId)}
                        >
                            Term {termId} {sortedUserTerms.find(term => term.userTermId === termId)?.termSeason || getCurrentSeason(termId, maxTermId, getLastSeason(sortedUserTerms))}
                        </button>
                    );
                })}


                {/* Button to add the next term */}
                {userTerms.length ? (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110"
                        onClick={handleAddTerm}
                    >
                        Add Term
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default TermButtons;

