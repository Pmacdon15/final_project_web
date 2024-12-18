import NavBar from '../nav-bar/NavBar.Component';
import DisplayAllPrograms from '../all-programs/DisplayAllPrograms.component';
import { LoadAllPrograms } from '../../../placeholders/load-data/loadData.action';
import { LoadUserPrograms } from '../../../placeholders/load-data/loadData.action';
import { useParams } from 'react-router-dom';

import React from 'react';
// import { useEffect } from 'react';
import DisplayUserPrograms from './DisplayUserPrograms.component';
export default function StudentPortalMyPrograms() {
    const { email } = useParams();
    //   console.log("From My Programs", email);

    const [programs, setPrograms] = React.useState([]);
    const [userPrograms, setUserPrograms] = React.useState([]);

    React.useEffect(() => {
        const fetchPrograms = async () => {
            const loadedPrograms = LoadAllPrograms();
            setPrograms(loadedPrograms);
            const loadedUserPrograms = LoadUserPrograms(email);
            setUserPrograms(loadedUserPrograms);
        };
        fetchPrograms();
    }, [email]);

    return (
        <>
            <div className=" bg-blue-100  shadow-lg gap-4   p-4 md:p-8 border rounded-lg ">
                <h1>My Programs</h1>
                <p>
                    Here you can see all the programs available for you to
                    enroll in as well as the programs you are enrolled in.
                </p>
            </div>
            <DisplayAllPrograms
                programs={programs}
                email={email}
                isMyProgramPage={true}
            />
            <DisplayUserPrograms programs={userPrograms} email={email} />
        </>
    );
}
