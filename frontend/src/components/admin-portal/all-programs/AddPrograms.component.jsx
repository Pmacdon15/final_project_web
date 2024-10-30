import React, { useState, useEffect } from 'react';
import { AddProgramToLocalStorage, EditProgramInLocalStorage } from '../../../placeholders/load-data/loadData.action';

export default function ProgramForm({ program, onCreate, onEdit, onClose }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [durationTerms, setDurationTerms] = useState('');
    const [tuition, setTuition] = useState('');

    useEffect(() => {
        if (program) {
            setName(program.name);
            setDescription(program.description);
            setDurationTerms(program.durationTerms);
            setTuition(program.tuition);
        }
    }, [program]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProgram = {
          name,
          description,
          durationTerms: Number(durationTerms),
          tuition: Number(tuition),
        };
      
        if (program) {
            newProgram.id = program.id
          EditProgramInLocalStorage(newProgram);
          onEdit(newProgram);
        } else {
          AddProgramToLocalStorage(newProgram);
          onCreate();
        }
      };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full item-center md:w-4/6 bg-blue-100 shadow-lg gap-4 p-4 md:p-8 border rounded-lg mb-8">
            <h2>{program ? 'Edit Program' : 'Create Program'}</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Program Name"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Program Description"
                required
            />
            <input
                type="number"
                value={durationTerms}
                onChange={(e) => setDurationTerms(e.target.value)}
                placeholder="Duration in Terms"
                required
            />
            <input
                type="number"
                value={tuition}
                onChange={(e) => setTuition(e.target.value)}
                placeholder="Tuition"
                required
            />
            <div>
            <button className="bg-green-600 w-24 mx-4 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-green-700"
          type="submit">Submit</button>
            <button type="button" onClick={onClose} className="bg-red-600 w-24 mx-4 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-green-700">Cancel</button>
            </div>
        </form>
    );
}
