

import "../../../App.css";

import DisplayAllPrograms from "../../../components/student-portal/all-programs/DisplayAllPrograms.component";
import { LoadAllPrograms } from "../../../placeholders/load-data/loadData.action";
import React, { useEffect, useState } from "react";
import ProgramForm from "./AddPrograms.component"; // New component for creating/editing
// import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

export default function AdminPortalAllPrograms() {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);

  const fetchPrograms = async () => {
    const loadedPrograms = LoadAllPrograms();
    setPrograms(loadedPrograms);
  };
  useEffect(() => {
    fetchPrograms();
  }, []);

  const createProgram = () => {
    // setPrograms([...programs, { ...newProgram, id: uuidv4() }]);
    fetchPrograms();
    setFormVisible(false);
  };

  const editProgram = (updatedProgram) => {
    setPrograms(
      programs.map((program) =>
        program.id === updatedProgram.id ? updatedProgram : program
      )
    );
    setSelectedProgram(null);
    setFormVisible(false);
  };

  const deleteProgram = (id) => {
    setPrograms(programs.filter((program) => program.id !== id));
  };

  const openForm = (program = null) => {
    setSelectedProgram(program);
    setFormVisible(true);
  };

  return (
    <>
      <div className="bg-blue-100 shadow-lg my-4 gap-4 p-3 md:p-8 border rounded-lg">
        <h1>All Programs</h1>
        <p>Here you can see all the programs available.</p>
      </div>
      <div className="items-center justify-items-center">
        <button
          onClick={() => openForm()}
          className="bg-blue-500 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 mr-2"
        >
          Create Program
        </button>
      </div>
      {isFormVisible && (
        <ProgramForm
          program={selectedProgram}
          onCreate={createProgram}
          onEdit={editProgram}
          onClose={() => setFormVisible(false)}
        />
      )}

      <DisplayAllPrograms
        programs={programs}
        onEdit={openForm}
        onDelete={deleteProgram}
        isAdmin={true}
      />
    </>
  );
}
