import programs from '../load-data/programs.data.json';
import userPrograms from '../load-data/userPrograms.data.json';
import allClasses from '../load-data/allClasses.data.json';

function LoadAllPrograms() {
  return programs;
}

function LoadAllClassesToLocalStorage() {
  const existingClasses = JSON.parse(localStorage.getItem('allClasses')) || [];
  const newClasses = allClasses.filter(newClass =>
    existingClasses && !existingClasses.some(existingClass => existingClass.id === newClass.id)
  );
  const updatedClasses = [...existingClasses, ...newClasses];
  localStorage.setItem('allClasses', JSON.stringify(updatedClasses));
  console.log('All classes loaded to local storage without duplicates');
}

LoadAllClassesToLocalStorage();

function LoadAllClasses() {
  const storedClasses = localStorage.getItem('allClasses');
  return storedClasses ? JSON.parse(storedClasses) : null;
}


export { LoadAllPrograms,  LoadAllClasses };


