import NavBar from "../nav-bar/NavBar.Component"
import React, { useEffect, useState } from 'react';
import DisplayAllClasses from '../all-classes/DisplayAllClasses.component';
import { LoadAllClasses } from '../../../placeholders/load-data/loadData.action';

export default function StudentPortalMyClasses() {
    const [allClasses, setAllClasses] = useState();
    // const [term, setTerm] = useState();
    // const [amountOfTerms, setAmountOfTerms] = useState();

    useEffect(() => {
        const fetchAllClasses = async () => {
            const loadedAllClasses = LoadAllClasses();
            setAllClasses(loadedAllClasses);
        };
        fetchAllClasses();
    }, []);

    // useEffect(() => {
    //     if (allClasses) {
    //         const maxTerm = allClasses.reduce((max, currentClass) => {
    //             return currentClass.term > max ? currentClass.term : max;
    //         }, 0);
    //         setAmountOfTerms(maxTerm);
    //     }
    // }, [allClasses]);

    // console.log(amountOfTerms);
    return (
        <div className="flex flex-col w-full gap-4 justify-center items-center ">
            <NavBar email={""} />
            <div className=' bg-blue-100  shadow-lg gap-4  p-4 md:p-8 border rounded-lg'>
                <h1>My Classes</h1>
                <p>Here you can see all the classes you are enrolled in.</p>
            </div>
            <div className="bg-blue-100 w-4/6 shadow-lg p-2 md:p-8 border rounded-lg">
                <div className="flex bg-white p-2 w-full rounded-lg">
                    <p className="flex mr-auto">Term:</p>
                    {amountOfTerms &&
                        Array.from({ length: amountOfTerms }, (_, index) => (
                            <button
                                key={index + 1}
                                className="ml-2 p-2 bg-blue-500 text-white rounded"
                            >
                                Term {index + 1}
                            </button>
                        ))}
                </div >
                <DisplayAllClasses allClasses={allClasses} />


            </div >
        </div>
    )
}






