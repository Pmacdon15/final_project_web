import programs from '../load-data/programs.data.json';
// import userPrograms from '../load-data/userPrograms.data.json';
import allClasses from '../load-data/allClasses.data.json';
import userClasses from '../load-data/userClasses.data.json';

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

function LoadUserClassesToLocalStorage() {
  const existingUserClasses = JSON.parse(localStorage.getItem('userClasses')) || [];
  const newUserClasses = userClasses.filter(newUserClass =>
    existingUserClasses && !existingUserClasses.some(existingUserClass => existingUserClass.id === newUserClass.id)
  );
  const updatedUserClasses = [...existingUserClasses, ...newUserClasses];
  localStorage.setItem('userClasses', JSON.stringify(updatedUserClasses));
  console.log('User classes loaded to local storage without duplicates');
}

LoadUserClassesToLocalStorage()

function LoadUserClasses() {
  const storedUserClasses = localStorage.getItem('userClasses');
  return storedUserClasses ? JSON.parse(storedUserClasses) : null;
}

export { LoadAllPrograms,  LoadAllClasses, LoadUserClasses };


