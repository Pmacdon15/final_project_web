import { LoadUserData } from '../../../placeholders/load-data/loadData.action';
import { useState, useEffect } from 'react';

export default function AdminPortalViewStudents() {
    const {students} = useFetchUsers();    

    return (
        <div className='flex flex-col p-2 md:p-4 gap-4 w-full justify-center items-center ' >
            <div className='bg-blue-100 p-4 rounded-lg w-4/6 md:w-1/6'>
                <h1>Students</h1>
                <p>Here you will be able to View all students.</p>
            </div>
            <div className='flex flex-wrap bg-blue-100 justify-center rounded-lg w-full md:w-5/6 gap-4 p-2 md:gap-1 shadow-lg'>
                {students.map((student) => (
                    <div
                        key={student.id}
                        className='flex flex-col w-[40%] md:w-1/6 bg-white p-4 rounded-lg shadow-lg   md:m-2 gap-2'
                    >
                        <p>First Name: {student.firstName}</p>
                        <p>Last Name: {student.lastName}</p>
                        <p>Student ID: {student.id}</p>
                        <p>Program: {student.program}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const useFetchUsers = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchStudents = async () => {
            const fetchStudents = await LoadUserData();
            setStudents(fetchStudents);
            console.log(fetchStudents);
        }
        fetchStudents();
    }, []);
    return { students };
}