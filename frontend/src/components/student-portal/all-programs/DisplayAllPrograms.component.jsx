import React, { useState } from 'react';
import DisplayProgram from './DisplayProgram.component';
import filterPrograms from '../../../utils/search-filter';
import SearchFilters from '../../search-filters/SearchFilters.component';

export default function DisplayAllPrograms({ programs, isAdmin, onEdit, onDelete }) {
    const [searchByName, setSearchByName] = useState('');
    const [searchByLength, setSearchByLength] = useState({
        value: '',
        operator: 'eq'
    });

    let filteredPrograms = filterPrograms(
        programs,
        searchByName,
        searchByLength
    );

    return (
        <>
            <SearchFilters
                searchByName={searchByName}
                searchByLength={searchByLength}
                setSearchByName={setSearchByName}
                setSearchByLength={setSearchByLength}
            />
            <div className="flex flex-col w-full md:w-4/6 bg-blue-100 shadow-lg gap-4 p-4 md:p-8 border rounded-lg mb-8">
                {filteredPrograms.length === 0 ? (
                    <div>No data to load</div>
                ) : (
                    filteredPrograms.map((program, index) => (
                        <DisplayProgram key={index} program={program} isAdmin={isAdmin} onEdit={onEdit} onDelete={onDelete} />
                    ))
                )}
            </div>
        </>
    );
}
