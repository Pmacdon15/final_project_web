import { AddClassFunction } from '../../../placeholders/load-data/loadData.action';

export default function AddClass({ onFormAction }) {
  const handleOnAdd = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const programId = formData.get('programId');
    const className = formData.get('className');
    const description = formData.get('description');

    // Get checkbox elements
    const availableFall = event.target.availableFall.checked;
    const availableWinter = event.target.availableWinter.checked;
    const availableSpring = event.target.availableSpring.checked;
    const availableSummer = event.target.availableSummer.checked;

    console.log("Adding class: ", className);
    await AddClassFunction(programId, description, className, availableFall, availableWinter, availableSpring, availableSummer);
    onFormAction(className);
  }

  return (
    <div className="flex flex-col bg-gray-100 p-4 h-fit w-full items-center ">
      <form
        onSubmit={handleOnAdd}
        className="flex flex-col h-fit items-center w-full">
        <input type="text"
          name="className"
          className=" text-center w-5/6 md:w-2/6 border rounded-lg p-2 mb-2"
          placeholder={"Class Name"}
          required={true}
        />
        <input type="number"
          required={true}
          name="programId"
          placeholder={"Program ID"}
          className="w-5/6 md:w-3/6 border rounded-lg p-2 mb-2"
        />
        <textarea
          name="description"
          placeholder={"Class Description"}
          className="w-5/6 md:w-3/6 h-36 border rounded-lg p-2 mb-2" 
          required={true}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <label htmlFor="availableFall">Available fall:</label>
          <input type="checkbox" name="availableFall" />
          <label htmlFor="availableWinter">Available Winter:</label>
          <input type="checkbox" name="availableWinter" />
          <label htmlFor="availableSpring">Available Spring:</label>
          <input type="checkbox" name="availableSpring" />
          <label htmlFor="availableSummer">Available Summer:</label>
          <input type="checkbox" name="availableSummer" />
        </div>
        <button
          className="bg-green-600 mt-1 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 hover:bg-green-700"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  )
}