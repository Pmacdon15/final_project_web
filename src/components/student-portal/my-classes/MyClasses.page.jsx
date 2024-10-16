import React, { useEffect, useState } from 'react';
import DisplayAvailableClasses from '../my-classes/DisplayAvailableClasses.component';
import DisplayUserClasses from './DisplayUserClasses.component';
import {
    LoadAllClasses,
    LoadUserClasses
} from '../../../placeholders/load-data/loadData.action';
import FirstSeasonSelector from './FirstSeasonSelector.component';
import TermButtonSelector from './TermButtonSelector.component';
import PageHeader from '../../page-header/PageHeader.component';
import getUserInfo from '../../../utils/get-user-info';
import { Box, Stack, TextField } from '@mui/material';
import filterPrograms from '../../../utils/search-filter';

export default function StudentPortalMyClasses() {
    const { email } = getUserInfo();

    const [allClasses, setAllClasses] = useState();
    const [userClasses, setUserClasses] = useState();
    const [filteredClasses, setFilteredClasses] = useState();
    const [userTerms, setUserTerms] = useState([]);
    const [season, setSeason] = useState();
    const [selectedTerm, setSelectedTerm] = useState();
    const [searchByName, setSearchByName] = useState('');


    const fetchAllClasses = async () => {
        const loadedAllClasses = LoadAllClasses();
        const loadedUserClasses = LoadUserClasses();
        setAllClasses(loadedAllClasses);
        setUserClasses(loadedUserClasses);
    };
    // Load all classes and user classes
    useEffect(() => {
        fetchAllClasses();
    }, [selectedTerm]);

    const handleChangeInClasses = async (termId, termSeason) => {
        await fetchAllClasses();
        console.log('User terms: ', userTerms);
        console.log('Class added to term ID: ', termId, 'Term Season: ', termSeason);
        setUserTerms([{ userTermId: Number(termId), termSeason: termSeason }]);
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

    // Get user terms without duplicates
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

    // Filter classes based on season and user classes
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

    // Filter user classes based on selected term
    const filteredUserClasses = selectedTerm
        ? userClasses?.filter(
            userClass => userClass.userTermId === selectedTerm.userTermId
        ) || []  // Fallback to an empty array if userClasses is undefined
        : userClasses || [];  // Fallback to an empty array if userClasses is undefined


    // Set the selected term to the first term in the user terms
    useEffect(() => {
        const sortedUserTerms = [...userTerms].sort((a, b) => a.userTermId - b.userTermId);

        if (userTerms && userTerms.length > 0 && !selectedTerm) {
            setSelectedTerm(sortedUserTerms[0]);
            setSeason(sortedUserTerms[0].termSeason);
        } else if (!userTerms.length) {
            // Reset selected term if there are no user terms
            setSelectedTerm(null);
            setSeason(null);
        }
    }, [userTerms, selectedTerm]);


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
                <Box
                    className="w-full "
                    component="fieldset"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',

                        '> legend': {
                            textAlign: 'left',
                            fontWeight: 'bold',
                            marginBottom: '.5rem'
                        },

                        'div > div': {
                            background: 'white'
                        },

                        input: {
                            borderRadius: '0.25rem'
                        }
                    }}
                >
                    <Stack spacing={2} direction="row">
                        <TextField
                            color="black"
                            id="search-by-name"
                            label="Class Name"
                            value={searchByName}
                            onChange={typedByUser => {
                                setSearchByName(
                                    typedByUser.target.value.toLocaleLowerCase()
                                );
                            }}
                            sx={{ flex: 1 }}
                            className="p-2 rounded-lg"
                        />
                    </Stack>
                </Box>
                <div className="flex flex-col md:flex-row h-4/6 md:h-5/6 w-full gap-2  ">
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
                </div>
            </div>
        </>
    );
}
