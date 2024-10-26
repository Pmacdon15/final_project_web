import { LoadUserData } from '../../../placeholders/load-data/loadData.action';
import { useState, useEffect } from 'react';

export default function AdminPortalViewStudents() {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchStudents = () => {
            const fetchStudents = LoadUserData();
            setStudents(fetchStudents);
            console.log(fetchStudents);
        }
        fetchStudents();
    }, []);

    return (
        <div >
            <div>
                <h1>Students</h1>
                <p>Here you will be able to View all students.</p>
            </div>
            <div>
                {students.map((student) => (
                    <div key={student.id}>
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