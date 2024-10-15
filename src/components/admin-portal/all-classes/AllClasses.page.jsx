import { LoadAllClasses } from '../../../placeholders/load-data/loadData.action';
import React, { useEffect, useState } from 'react';
import NavBar from '../../student-portal/nav-bar/NavBar.Component';
import DisplayAllClasses from '../../student-portal/all-classes/DisplayAllClasses.component';
import PageHeader from '../../page-header/PageHeader.component';
export default function AdminPortalAllClasses() {
    const [allClasses, setAllClasses] = useState();

    const fetchAllClasses = async () => {
        const loadedAllClasses = LoadAllClasses();
        setAllClasses(loadedAllClasses);
    };
    const onFormAction = async className => {
        fetchAllClasses();
    };

    useEffect(() => {
        fetchAllClasses();
    }, []);

    // console.log(JSON.stringify(allClasses, null, 2));

    return (
        <>
            <PageHeader title="All Classes" />
            <DisplayAllClasses
                allClasses={allClasses}
                isAdmin={true}
                onFormAction={onFormAction}
            />
        </>
    );
}
