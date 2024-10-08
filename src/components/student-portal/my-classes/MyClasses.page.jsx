import NavBar from "../nav-bar/NavBar.Component"
import React, { useEffect, useState } from 'react';
import DisplayMyClasses from '../my-classes/DisplayMyClasses.component';
import { LoadAllClasses, LoadUserClasses } from '../../../placeholders/load-data/loadData.action';

export default function StudentPortalMyClasses() {
    const [allClasses, setAllClasses] = useState();
    const [filteredClasses, setFilteredClasses] = useState();
    const [userClasses, setUserClasses] = useState();    
    const [season, setSeason] = useState();

    // const [amountOfTerms, setAmountOfTerms] = useState();

    useEffect(() => {
        const fetchAllClasses = async () => {
            const loadedAllClasses = LoadAllClasses();
            const loadedUserClasses = LoadUserClasses();
            setAllClasses(loadedAllClasses);
            setFilteredClasses(loadedAllClasses);
            setUserClasses( loadedUserClasses);
        };
        fetchAllClasses();
    }, []);

    useEffect(() => {
        if (season === "Fall") {
            setFilteredClasses(allClasses.filter(classItem => classItem.availableFall === true));
            console.log("filtered classes:", filteredClasses);
        }
        if (season === "Winter") {
            setFilteredClasses(allClasses.filter(classItem => classItem.availableWinter === true));
        }
        if (season === "Spring") {
            setFilteredClasses(allClasses.filter(classItem => classItem.availableSpring === true));
        }
        if (season === "Summer") {
            setFilteredClasses(allClasses.filter(classItem => classItem.availableSummer === true));
        }
    }, [season]);

    return (
        <div className="flex flex-col w-full gap-4 justify-center items-center ">
            <NavBar email={""} />
            <div className='bg-blue-100 shadow-lg gap-4 p-4 md:p-8 border rounded-lg items-center justify-center text-center'>
                <h1 className="text-2xl">My Classes</h1>
                <p>Here you can see all the classes you can enrolled in or can enroll.</p>
            </div>

            <div className="flex flex-col bg-blue-200 w-5/6 shadow-lg items-center justify-center gap-4 p-2 md:p-4 border rounded-lg text-center">
            <h1 className="text-2xl">Available Classes</h1>
                <div className="flex bg-white p-2 w-full rounded-lg justify-center">
                    <p className="mr-auto">Season:</p>
                    <div className="flex gap-2 justify-center w-full">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110" onClick={() => setSeason("Fall")}>Fall</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110" onClick={() => setSeason("Winter")}>Winter</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110" onClick={() => setSeason("Spring")}>Spring</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110" onClick={() => setSeason("Summer")}>Summer</button>
                    </div>
                </div >
                <div className="flex bg-white p-2 w-full rounded-lg justify-center">
                    <p className="mr-auto">Term:</p>
                    <div className="flex gap-2 justify-center w-full">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setSeason("Fall")}>1</button>

                    </div>
                </div>
                <DisplayMyClasses filteredClasses={filteredClasses} />
            </div >
            
        </div>
    )
}






