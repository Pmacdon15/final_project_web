import { useParams } from "react-router-dom";
import NavBar from "../nav-bar/NavBar.Component";
import React, { useEffect, useState } from 'react';
import DisplayAvailableClasses from '../my-classes/DisplayAvailableClasses.component';
import DisplayUserClasses from "./DisplayUserClasses.component";
import { LoadAllClasses, LoadUserClasses, AddClassToUserClasses } from '../../../placeholders/load-data/loadData.action';
import FirstSeasonSelector from "./FirstSeasonSelector.component";
import TermButtonSelector from "./TermButtonSelector.component";

export default function StudentPortalMyClasses() {
    const { email } = useParams();
    const [allClasses, setAllClasses] = useState();
    const [filteredClasses, setFilteredClasses] = useState();
    const [userClasses, setUserClasses] = useState();
    const [userTerms, setUserTerms] = useState();
    const [season, setSeason] = useState();
    const [selectedTerm, setSelectedTerm] = useState();

    useEffect(() => {
        const fetchAllClasses = async () => {
            const loadedAllClasses = LoadAllClasses();
            const loadedUserClasses = LoadUserClasses();
            setAllClasses(loadedAllClasses);
            setUserClasses(loadedUserClasses);
        };
        fetchAllClasses();
    }, []);

    useEffect(() => {
        if (userClasses) {
            const terms = [...new Set(userClasses.map(userClass => userClass.userTermId))];
            const termsWithSeason = terms.map(term => {
                const classInfo = userClasses.find(userClass => userClass.userTermId === term);
                return { userTermId: term, termSeason: classInfo.termSeason };
            });
            setUserTerms(termsWithSeason);
        }
    }, [userClasses]);

    useEffect(() => {
        if (season && allClasses) {
            let availableClasses = [];

            if (season === "Fall") {
                availableClasses = allClasses.filter(classItem => classItem.availableFall);
            } else if (season === "Winter") {
                availableClasses = allClasses.filter(classItem => classItem.availableWinter);
            } else if (season === "Spring") {
                availableClasses = allClasses.filter(classItem => classItem.availableSpring);
            } else if (season === "Summer") {
                availableClasses = allClasses.filter(classItem => classItem.availableSummer);
            }

            if (userClasses) {
                const userClassIds = new Set(userClasses.map(userClass => userClass.id));
                availableClasses = availableClasses.filter(classItem => !userClassIds.has(classItem.id));
            }

            setFilteredClasses(availableClasses);
        }
    }, [season, allClasses, userClasses]);

    function getNextSeason(currentSeason) {
        const seasons = ["Fall", "Winter", "Spring", "Summer"];
        const currentIndex = seasons.indexOf(currentSeason);
        return seasons[(currentIndex + 1) % seasons.length];
    }

    const filteredUserClasses = selectedTerm
        ? userClasses?.filter(userClass => userClass.userTermId === selectedTerm.userTermId)
        : userClasses;

    useEffect(() => {
        if (userTerms && userTerms.length > 0) {
            setSelectedTerm(userTerms[0]);
            setSeason(userTerms[0].termSeason);
        }
    }, [userTerms]);

    return (
        <div className="flex flex-col w-full gap-4 justify-center items-center">
            <NavBar email={email} />
            <div className='bg-blue-100 shadow-lg gap-4 p-4 md:p-8 border rounded-lg items-center justify-center text-center'>
                <h1 className="text-2xl">My Classes</h1>
                <p>Here you can see all the classes you can enroll in or can enroll.</p>
            </div>

            <div className="flex flex-col bg-blue-200 w-5/6 shadow-lg items-center justify-center gap-4 p-2 md:p-4 border rounded-lg text-center">
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
                <h1 className="text-2xl">Available classes:</h1>
                <DisplayAvailableClasses filteredClasses={filteredClasses} email={email} termId={selectedTerm?.userTermId} season={season} />
                <h1 className="text-2xl">User classes:</h1>
                <DisplayUserClasses userClasses={filteredUserClasses} email={email} />
            </div>
        </div>
    );
}
