import { useParams } from "react-router-dom";
import NavBar from "../nav-bar/NavBar.Component";
import React, { useEffect, useState } from 'react';
import DisplayAvailableClasses from '../my-classes/DisplayAvailableClasses.component';
import DisplayUserClasses from "./DisplayUserClasses.component";
import { LoadAllClasses, LoadUserClasses, AddClassToUserClasses } from '../../../placeholders/load-data/loadData.action';
import FirstSeasonSelector from "./FirstSeasonSelector.component";
import TermButtonSelector from "./TermButtonSelector.component";
import PageHeader from "../../page-header/PageHeader.component";

export default function StudentPortalMyClasses() {
    const { email } = useParams();
    const [allClasses, setAllClasses] = useState();
    const [userClasses, setUserClasses] = useState();
    const [filteredClasses, setFilteredClasses] = useState();    
    const [userTerms, setUserTerms] = useState();
    const [season, setSeason] = useState();
    const [selectedTerm, setSelectedTerm] = useState();

    // Load all classes and user classes
    useEffect(() => {
        const fetchAllClasses = async () => {
            const loadedAllClasses = LoadAllClasses();
            const loadedUserClasses = LoadUserClasses();
            setAllClasses(loadedAllClasses);
            setUserClasses(loadedUserClasses);
        };
        fetchAllClasses();
    }, []);

    // const handleAddClass = (newClass) => {
    //     setUserClasses((prevUserClasses) => [...prevUserClasses, newClass]);
    // };

    // Get user terms
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

    // Filter classes based on season and user classes
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
            //Filter out classes that the user is already enrolled in
            if (userClasses) {
                const userClassIds = userClasses.map(userClass => userClass.classId); // Use classId from userClasses
                availableClasses = availableClasses.filter(classItem => !userClassIds.includes(classItem.id)); // Compare with id from availableClasses
            }
            
            setFilteredClasses(availableClasses);
        }
    }, [season, allClasses, userClasses]); 

    // Filter user classes based on selected term
    const filteredUserClasses = selectedTerm
        ? userClasses?.filter(userClass => userClass.userTermId === selectedTerm.userTermId)
        : userClasses;

    // Set the selected term to the first term in the user terms
    useEffect(() => {
        if (userTerms && userTerms.length > 0) {
            setSelectedTerm(userTerms[0]);
            setSeason(userTerms[0].termSeason);
        }
    }, [userTerms]);

    return (
        <div className="flex flex-col w-full gap-4 justify-center items-center">
            <NavBar email={email} />
            <PageHeader title={"My Classes"} description={"Here you can see all the classes you can enroll in or can enroll."} />
            <div className="flex flex-col bg-blue-200 w-full md:w-5/6 shadow-lg items-center justify-center gap-4 p-2 md:p-4 border rounded-lg text-center">
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
                <DisplayAvailableClasses
                    filteredClasses={filteredClasses}
                    email={email} termId={selectedTerm?.userTermId}
                    season={season}
                />
                <DisplayUserClasses
                    userClasses={filteredUserClasses}
                    email={email}
                />
            </div>
        </div>
    );
}
