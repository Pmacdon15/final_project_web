import { LoadAllClasses } from '../../../placeholders/load-data/loadData.action';
import React, { useEffect, useState } from 'react';
import DisplayAllClasses from './DisplayAllClasses.component';
import filterPrograms from '../../../utils/search-filter';
import { Box, Stack, TextField } from '@mui/material';
import SearchFilters from '../../search-filters/SearchFilters.component';

export default function StudentPortalAllClasses() {
    const [allClasses, setAllClasses] = useState([]);

    const [searchByName, setSearchByName] = useState('');

    useEffect(() => {
        const fetchAllClasses = async () => {
            const loadedAllClasses = LoadAllClasses();
            setAllClasses(loadedAllClasses);
        };
        fetchAllClasses();
    }, []);

    const filteredClasses = filterPrograms(allClasses, searchByName);

    // console.log(JSON.stringify(allClasses, null, 2));

    return (
        <>
            <div className=" bg-blue-100  shadow-lg gap-4  p-4 md:p-8 border rounded-lg">
                <h1>All Classes</h1>
                <p>Here you can see all the classes available.</p>
            </div>

            <SearchFilters searchByName={searchByName} setSearchByName={setSearchByName}/>
            <DisplayAllClasses allClasses={filteredClasses} isAdmin={false} />
        </>
    );
}
