import React, { useEffect, useState, useCallback } from 'react';
import DisplayAvailableClasses from './DisplayAvailableClasses.component';
import DisplayUserClasses from './DisplayUserClasses.component';
import {
    LoadAllClasses,
    LoadUserClasses
} from '../../../placeholders/load-data/loadData.action';
import FirstSeasonSelector from './FirstSeasonSelector.component';
import TermButtonSelector from './TermButtonSelector.component';
import PageHeader from '../../page-header/PageHeader.component';
import getUserInfo from '../../../utils/get-user-info';
import filterPrograms from '../../../utils/search-filter';
import SearchFilters from './SearchFliters';

export default function StudentPortalMyClasses() {
    const { email } = getUserInfo();
    // console.log('User email:', email);

    // const [season, setSeason] = useState();
    const [searchByName, setSearchByName] = useState('');

    const { allClasses, userClasses, fetchAllClasses, isLoading } = useGetAndSetAllClasses(email);
    const { userTerms, setUserTerms } = useGetAndSetUserTerms(userClasses);
    const { selectedTerm, setSelectedTerm, season, setSeason } = useGetAndSetSelectedTermAndSeason(userTerms);
    const { filteredClasses } = useGetAndSetFilteredClasses(season, allClasses, userClasses, searchByName);

    // Filter user classes based on selected term
    const filteredUserClasses = selectedTerm
        ? userClasses?.filter(
            userClass => userClass.userTermId === selectedTerm.userTermId
        ) || []  // Fallback to an empty array if userClasses is undefined
        : userClasses || [];  // Fallback to an empty array if userClasses is undefined


    const handleChangeInClasses = async (termId, termSeason) => {
        await fetchAllClasses();
        console.log('User terms: ', userTerms);
        console.log('Class added to term ID: ', termId, 'Term Season: ', termSeason);
        setUserTerms(prevTerms => {
            const newTerm = { userTermId: Number(termId), termSeason: termSeason };
            const termExists = prevTerms.some(term => term.userTermId === newTerm.userTermId);
            if (!termExists) {
                return [...prevTerms, newTerm];
            }
            return prevTerms;
        });
        setSelectedTerm({ userTermId: Number(termId), termSeason: termSeason });
    };

    console.log("All Classes: ", allClasses);

    return (
        <>
            <PageHeader title={'My Classes'} />
            <div className="flex flex-col bg-blue-200 w-full shadow-lg items-center h-5/6 gap-4 p-2 md:p-4 border rounded-lg text-center">
                {!selectedTerm && (
                    <FirstSeasonSelector
                        setSeason={setSeason}
                        setSelectedTerm={setSelectedTerm}
                        setUserTerms={setUserTerms}
                    />
                )}
                <TermButtonSelector
                    userTerms={userTerms}
                    setUserTerms={setUserTerms}
                    selectedTerm={selectedTerm}
                    setSelectedTerm={setSelectedTerm}
                    setSeason={setSeason}
                />
                <SearchFilters searchByName={searchByName} setSearchByName={setSearchByName} />
                <div className="flex flex-col md:flex-row h-4/6 md:h-5/6 w-full gap-2  ">
                    {isLoading ? <p>Loading...</p> :
                        <>
                            <DisplayAvailableClasses
                                filteredClasses={filteredClasses}
                                email={email}
                                termId={selectedTerm?.userTermId}
                                season={season}
                                onAddClass={handleChangeInClasses}
                            />

                            {filteredClasses && filteredClasses.length > 0 && (
                                <DisplayUserClasses
                                    userClasses={filteredUserClasses}
                                    email={email}
                                    onDropClass={handleChangeInClasses}
                                    termId={selectedTerm?.userTermId}
                                    season={season}
                                />
                            )}
                        </>
                    }
                </div>
            </div>
        </>
    );
}


const useGetAndSetAllClasses = (email) => {
    const [allClasses, setAllClasses] = useState();
    const [userClasses, setUserClasses] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllClasses = useCallback(async () => {
        setIsLoading(true);
        const loadedAllClasses = await LoadAllClasses(false);
        const loadedUserClasses = LoadUserClasses();

        setAllClasses(loadedAllClasses);
        const filteredUserClasses = loadedUserClasses.filter(
            userClass => userClass.userId === email
        );
        setUserClasses(filteredUserClasses);
        setIsLoading(false);

    }, [email]);

    useEffect(() => {
        fetchAllClasses();
    }, [fetchAllClasses]);
    return { allClasses, userClasses, fetchAllClasses, isLoading };

};

const useGetAndSetUserTerms = (userClasses) => {
    const [userTerms, setUserTerms] = useState([]);

    useEffect(() => {
        if (userClasses && userClasses.length > 0) {
            const terms = [
                ...new Set(userClasses.map(userClass => userClass.userTermId))
            ];
            const termsWithSeason = terms.map(term => {
                const classInfo = userClasses.find(
                    userClass => userClass.userTermId === term
                );
                return { userTermId: term, termSeason: classInfo.termSeason };
            });

            // Remove duplicates and add to existing userTerms
            setUserTerms(prevTerms => {
                const newTerms = termsWithSeason.filter(
                    term => !prevTerms.some(prevTerm => prevTerm.userTermId === term.userTermId)
                );
                return [...prevTerms, ...newTerms];
            });
        }
    }, [userClasses]);
    console.log('User terms: ', userTerms);
    return { userTerms, setUserTerms };
}

const useGetAndSetFilteredClasses = (season, allClasses, userClasses, searchByName) => {
    const [filteredClasses, setFilteredClasses] = useState();

    useEffect(() => {
        if (season && allClasses) {
            const searchFilteredClasses = filterPrograms(
                allClasses,
                searchByName
            );

            let availableClasses = [];

            if (season === 'Fall') {
                availableClasses = searchFilteredClasses.filter(
                    classItem => classItem.availableFall
                );
            } else if (season === 'Winter') {
                availableClasses = searchFilteredClasses.filter(
                    classItem => classItem.availableWinter
                );
            } else if (season === 'Spring') {
                availableClasses = searchFilteredClasses.filter(
                    classItem => classItem.availableSpring
                );
            } else if (season === 'Summer') {
                availableClasses = searchFilteredClasses.filter(
                    classItem => classItem.availableSummer
                );
            }
            //Filter out classes that the user is already enrolled in
            if (userClasses) {
                const userClassIds = userClasses.map(
                    userClass => userClass.classId
                ); // Use classId from userClasses
                availableClasses = availableClasses.filter(
                    classItem => !userClassIds.includes(classItem.id)
                ); // Compare with id from availableClasses
            }
            setFilteredClasses(availableClasses);
        }
    }, [season, allClasses, userClasses, searchByName]);

    return { filteredClasses };
}

const useGetAndSetSelectedTermAndSeason = (userTerms) => {
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [season, setSeason] = useState(null);

    useEffect(() => {
        if (userTerms && userTerms.length > 0) {
            const sortedUserTerms = [...userTerms].sort((a, b) => a.userTermId - b.userTermId);
            setSelectedTerm(sortedUserTerms[0]);
            setSeason(sortedUserTerms[0].termSeason);
        }
    }, [userTerms]);

    return { selectedTerm, setSelectedTerm, season, setSeason };
};

