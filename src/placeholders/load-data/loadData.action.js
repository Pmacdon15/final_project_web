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
  if (existingUserData.length === 0) {
    console.log('No existing user data found in local storage');
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    console.log('User data loaded to local storage without duplicates');
  }

}
LoadUserDataToLocalStorage();

function LoadAllClassesToLocalStorage() {
  const existingClasses = JSON.parse(localStorage.getItem('allClasses')) || [];
  const newClasses = allClasses.filter(newClass =>
    existingClasses && !existingClasses.some(existingClass => existingClass.id === newClass.id)
  );
  const updatedClasses = [...existingClasses, ...newClasses];
  if (existingClasses.length === 0) {
    localStorage.setItem('allClasses', JSON.stringify(updatedClasses));
  }
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
  if (existingUserClasses.length === 0) {
    localStorage.setItem('userClasses', JSON.stringify(updatedUserClasses));
  }
}

LoadUserClassesToLocalStorage()

function LoadUserClasses() {
  const storedUserClasses = localStorage.getItem('userClasses');
  return storedUserClasses ? JSON.parse(storedUserClasses) : null;
}

function AddToUserClasses(email, classId, termId, season) {
  const existingUserClasses = LoadUserClasses() || [];
  let newUserTermId;

  if (existingUserClasses.length === 0) {
    newUserTermId = 1; // Start at 1 if there are no existing classes
  } else {
    // Get the last userTermId
    const lastUserClass = existingUserClasses.reduce((max, userClass) =>
      userClass.userTermId > max ? userClass.userTermId : max, 0
    );
    newUserTermId = lastUserClass + 1; // Increment the last userTermId
  }

  const newUserClass = {
    id: classId,
    email,
    userTermId: newUserTermId,
    termSeason: season,
    programId: 1, // You can dynamically set this if you have a program ID for each class
    userId: 3 // Update this to reflect the actual user ID, if available
  };

  console.log(newUserClass);
  const updatedUserClasses = [...existingUserClasses, newUserClass];
  localStorage.setItem('userClasses', JSON.stringify(updatedUserClasses));
  console.log('User class added');
}

function DropUserClass(classId, email) {
  const existingUserClasses = LoadUserClasses() || [];

  // Keep classes that do not match both the classId and userId (email)
  const updatedUserClasses = existingUserClasses.filter(userClass =>
    !(userClass.classId === Number(classId) && userClass.userId === email)
  );

  localStorage.setItem('userClasses', JSON.stringify(updatedUserClasses));
  // console.log("updated data",updatedUserClasses);
  // console.log("Dropping class:", classId, "for user:", email);
  // console.log("Existing user classes before drop:", existingUserClasses);
}




export { LoadAllPrograms, LoadAllClasses, LoadUserClasses, AddToUserClasses, DropUserClass };


