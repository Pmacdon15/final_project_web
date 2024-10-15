import '../../../App.css';

import DisplayAllPrograms from './DisplayAllPrograms.component';
import { LoadAllPrograms } from '../../../placeholders/load-data/loadData.action';
import React from 'react';
import { useEffect, useState } from 'react';

export default function StudentPortalAllPrograms() {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        const fetchPrograms = async () => {
            const loadedPrograms = LoadAllPrograms();
            setPrograms(loadedPrograms);
        };

        fetchPrograms();
    }, []);

    return (
        <>
            <div className=" bg-blue-100  shadow-lg gap-4  p-4 md:p-8 border rounded-lg">
                <h1>All Programs</h1>
                <p>
                    Here you can see all the programs available for you to
                    enroll in.
                </p>
            </div>
            <DisplayAllPrograms programs={programs} />
        </>
    );
}
