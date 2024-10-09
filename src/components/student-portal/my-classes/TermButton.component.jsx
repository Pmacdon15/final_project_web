import React from 'react';

const TermButtons = ({ userTerms, selectedTerm, setSelectedTerm, setSeason }) => {
    return (
        <>
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
        </>
    );
};

export default TermButtons;
