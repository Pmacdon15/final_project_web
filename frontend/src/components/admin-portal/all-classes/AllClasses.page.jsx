import { LoadAllClasses } from '../../../placeholders/load-data/loadData.action';
import React, { useEffect, useState } from 'react';
import DisplayAllClasses from '../../student-portal/all-classes/DisplayAllClasses.component';
// import PageHeader from '../../page-header/PageHeader.component';
import filterPrograms from '../../../utils/search-filter';
import { Box, Stack, TextField } from '@mui/material';

export default function AdminPortalAllClasses() {

    const {allClasses, fetchAllClasses} = useFetchAllClasses();
    const [searchByName, setSearchByName] = useState('');    

    const filteredClasses = allClasses?.length 
    ? filterPrograms(allClasses, searchByName) 
    : [];

   
    return (
        <>
            <div className=" bg-blue-100  shadow-lg gap-4  p-4 md:p-8 border rounded-lg">
                <h1>All Classes</h1>
                <p>Here you can see all the classes available.</p>
            </div>

            <div className="bg-blue-200 w-full md:w-4/6 shadow-lg h-5/6 gap-4 p-2 md:p-4 border rounded-lg ">
                <Box
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
                        />
                    </Stack>
                </Box>
            </div>

            <DisplayAllClasses allClasses={filteredClasses} isAdmin={true} onFormAction={fetchAllClasses}/>
        </>
    );
}

const useFetchAllClasses = () => {
    const [allClasses, setAllClasses] = useState([]);

    const fetchAllClasses = async () => {
        const loadedAllClasses = await LoadAllClasses();
        setAllClasses(loadedAllClasses);
    };

    useEffect(() => {
        fetchAllClasses();
    }, []);

    return { allClasses, fetchAllClasses };
};