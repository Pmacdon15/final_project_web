import { LoadAllClasses } from '../../../placeholders/load-data/loadData.action';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function StudentPortalAllClasses() {
    const { email } = useParams();
    console.log(email);
    
    const [allClasses, setAllClasses] = useState();

    useEffect(() => {
        const fetchAllClasses = async () => {
            const loadedAllClasses = LoadAllClasses();
            setAllClasses(loadedAllClasses);
        };
        fetchAllClasses();
    }, [email]);

    console.log(JSON.stringify(allClasses, null, 2));
   

    return (
        <>
            hey
        </>
    )
}
