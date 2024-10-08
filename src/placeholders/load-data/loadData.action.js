import programs from '../load-data/programs.data.json';
// import userPrograms from '../load-data/userPrograms.data.json';
import allClasses from '../load-data/allClasses.data.json';
import userClasses from '../load-data/userClasses.data.json';
import userData from '../authentication/user.data.json';

function LoadAllPrograms() {
  return programs;
}

function LoadUserDataToLocalStorage() {
  const existingUserData = JSON.parse(localStorage.getItem('userData')) || [];
  const newUserData = userData.filter(newUser =>
    existingUserData && !existingUserData.some(existingUser => existingUser.email === newUser.email)
  );
  const updatedUserData = [...existingUserData, ...newUserData];
  localStorage.setItem('userData', JSON.stringify(updatedUserData));
  console.log('User data loaded to local storage without duplicates');
}
LoadUserDataToLocalStorage();

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

function AddClassToUserClasses(classId, email, termId, season) {

}


function DropUserClass(classId, email) {
  const existingUserClasses = LoadUserClasses();
  const updatedUserClasses = existingUserClasses.filter(userClass => userClass.id !== classId && userClass.email === email);
  localStorage.setItem('userClasses', JSON.stringify(updatedUserClasses));
  console.log('User class dropped');
}

export { LoadAllPrograms, LoadAllClasses, LoadUserClasses, AddClassToUserClasses, DropUserClass };


