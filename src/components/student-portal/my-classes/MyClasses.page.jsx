import { useParams } from 'react-router-dom';
import NavBar from '../nav-bar/NavBar.Component';
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
import { Box, Stack, TextField } from '@mui/material';
import filterPrograms from '../../../utils/search-filter';

export default function StudentPortalMyClasses() {
    const { email } = useParams();
    const [allClasses, setAllClasses] = useState();
    const [userClasses, setUserClasses] = useState();
    const [filteredClasses, setFilteredClasses] = useState();
    const [userTerms, setUserTerms] = useState();
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
        console.log('Term ID: ', termId, 'Term Season: ', termSeason);
        setUserTerms([{ userTermId: Number(termId), termSeason: termSeason }]);

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

            // Remove duplicates
            const uniqueTermsWithSeason = termsWithSeason.filter(
                (term, index, self) =>
                    index ===
                    self.findIndex(t => t.userTermId === term.userTermId)
            );

            setUserTerms(uniqueTermsWithSeason);
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
          )
        : userClasses;

    // Set the selected term to the first term in the user terms
    useEffect(() => {
        console.log('selectedTerm: ', selectedTerm);
        if (userTerms && userTerms.length > 0 && !selectedTerm) {
            setSelectedTerm(userTerms[0]);
            setSeason(userTerms[0].termSeason);
        }
    }, [userTerms, selectedTerm]);

    console.log('User terms: ', userTerms);
    return (
        <div className="flex flex-col w-full gap-4  h-svh ">
            <NavBar email={email} />
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

                    <DisplayUserClasses
                        userClasses={filteredUserClasses}
                        email={email}
                        onDropClass={handleChangeInClasses}
                        termId={selectedTerm?.userTermId}
                        season={season}
                    />
                </div>
            </div>
        </div>
    );
}
