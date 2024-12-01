import { DeleteProgram } from "../../../placeholders/load-data/loadData.action";

export default function DisplayProgram({ program, isAdmin, onEdit, onDelete }) {
  return (
    <div
      className={
        "flex flex-col w-full shadow-lg border-black items-center bg-white rounded-lg hover:shadow-2xl hover:border-blue-500 transition duration-300"
      }
    >
      <h1 className="text-2xl font-bold mb-2">{program.name}</h1>
      {isAdmin && (
        <p className="text-xl font-bold mb-2">
          Program ID:{" "}
          <span className="text-xl font-normal mb-2"> {program.id}</span>{" "}
        </p>
      )}
      <div>
        <p className="text-xl font-bold mb-2">Program Description:</p>
        <p className="text-justify mb-2">{program.description}</p>
      </div>
      <p className="text-xl font-bold mb-2">
        Amount of terms:{" "}
        <span className="text-xl font-normal mb-2">
          {program.durationTerms}
        </span>{" "}
      </p>
      <p className="text-xl font-bold mb-2">
        Tuition:{" "}
        <span className="text-xl font-normal mb-2"> ${program.tuition}</span>{" "}
      </p>
      {isAdmin && (
        <div className="flex gap-4 my-2">
          <button
            className="bg-green-600 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-green-700"
            onClick={() => onEdit(program)}
          >
            Edit
          </button>

          <button
            className="bg-red-600 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-red-700"
            onClick={() => {
              DeleteProgram(program.id);
              onDelete(program.id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
