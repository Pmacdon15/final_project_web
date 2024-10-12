import { LoadAllClasses } from '../../../placeholders/load-data/loadData.action';
import React, { useEffect, useState } from 'react';
import NavBar from '../../student-portal/nav-bar/NavBar.Component';
import DisplayAllClasses from '../../student-portal/all-classes/DisplayAllClasses.component';
import { useParams } from 'react-router-dom';
import PageHeader from "../../page-header/PageHeader.component";
export default function AdminPortalAllClasses() {

    const { email } = useParams();
    const [allClasses, setAllClasses] = useState();

    const fetchAllClasses = async () => {
        const loadedAllClasses = LoadAllClasses();
        setAllClasses(loadedAllClasses);
    };
    const onFormAction = async (className) => {
        fetchAllClasses();
    };

    useEffect(() => {
        fetchAllClasses();
    }, [email]);

    // console.log(JSON.stringify(allClasses, null, 2));

    return (
        <div className="flex flex-col w-full gap-4 justify-center items-center ">
            <NavBar email={email} />
            <PageHeader title="All Classes" />
            <DisplayAllClasses allClasses={allClasses} isAdmin={true} onFormAction={onFormAction} />
        </div>
    )
}