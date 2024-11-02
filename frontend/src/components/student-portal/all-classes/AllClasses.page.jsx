import { LoadAllClasses } from '../../../placeholders/load-data/loadData.action';
import React, { useEffect, useState } from 'react';
import DisplayAllClasses from './DisplayAllClasses.component';
import filterPrograms from '../../../utils/search-filter';
import SearchFilters from '../../search-filters/SearchFilters.component';

export default function StudentPortalAllClasses() {
    const { allClasses, isLoading } = useGetAndSetAllClasses();
    const [searchByName, setSearchByName] = useState('');

    const filteredClasses = filterPrograms(allClasses, searchByName);

    return (
        <>
            <div className=" bg-blue-100  shadow-lg gap-4  p-4 md:p-8 border rounded-lg">
                <h1>All Classes</h1>
            </div>

            <SearchFilters searchByName={searchByName} setSearchByName={setSearchByName} />
            {isLoading ? <p>Loading...</p> :
                <DisplayAllClasses allClasses={filteredClasses} isAdmin={false} />
            }
        </>
    );
}

const useGetAndSetAllClasses = () => {
    const [allClasses, setAllClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllClasses = async () => {
        setIsLoading(true);
        const loadedAllClasses = LoadAllClasses();
        setAllClasses(loadedAllClasses);
        setIsLoading(false);
    };

    useEffect(() => {

        fetchAllClasses();
    }, []);
    return { allClasses, isLoading };
}