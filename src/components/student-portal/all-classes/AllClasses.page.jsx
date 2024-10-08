import { LoadAllClasses } from '../../../placeholders/load-data/loadData.action';
import React, { useEffect, useState } from 'react';
import NavBar from '../nav-bar/NavBar.Component';
import DisplayAllClasses from './DisplayAllClasses.component';

export default function StudentPortalAllClasses() {    

    const [allClasses, setAllClasses] = useState();

    useEffect(() => {
        const fetchAllClasses = async () => {
            const loadedAllClasses = LoadAllClasses();
            setAllClasses(loadedAllClasses);
        };
        fetchAllClasses();
    }, []);

    // console.log(JSON.stringify(allClasses, null, 2));

    return (
        <div className="flex flex-col w-full gap-4 justify-center items-center ">
            <NavBar email={""} />
            <div className=' bg-blue-100  shadow-lg gap-4  p-4 md:p-8 border rounded-lg'>
                <h1>All Classes</h1>
                <p>Here you can see all the classes available.</p>
            </div>

            <DisplayAllClasses allClasses={allClasses}  />

        </div>
    )
}
