import { useState } from 'react';
import DisplayClass from './DisplayClass.component';
import AddClass from './AddClass.component';


export default function DisplayAllClasses({ allClasses, isAdmin, onFormAction }) {
    const [showAddClass, setShowAddClass] = useState(false);

    const showOrHideAddClass = () => {
        setShowAddClass(!showAddClass);
    }

    const handleOnAdd = () => { 
        showOrHideAddClass();
        onFormAction();
    }
    return (
        <div className="flex flex-col w-full md:w-4/6 bg-blue-100 shadow-lg gap-4 p-4 md:p-8 border rounded-lg mb-8">
            {Array.isArray(allClasses) && allClasses.map((classDetails, index) => (
                <DisplayClass key={index} classDetails={classDetails} isAdmin={isAdmin} onFormAction={onFormAction} />
            ))}
            {isAdmin && (
                <div className="flex flex-col w-full items-center">
                    <button
                        className={`bg-blue-500 p-2 text-white font-extrabold rounded-lg shadow-lg hover:scale-110 mr-2 ${showAddClass ? 'bg-red-500' : 'bg-blue-500'}`}
                        onClick={showOrHideAddClass}
                    >
                        {showAddClass ? 'Cancel' : 'Add Class'}
                    </button>
                </div>                
            )}
            {showAddClass && (
                <AddClass onFormAction={ handleOnAdd} />
            )}
        </div>
    )
}