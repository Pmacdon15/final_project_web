import programs from "./programs.data.json";
// import userPrograms from '../load-data/userPrograms.data.json';
import allClasses from "./allClasses.data.json";
import userClasses from "./userClasses.data.json";
import userData from "../authentication/user.data.json";

//MARK: Program data 

function LoadAllProgramsToLocalStorage() {
  const existingPrograms =
    JSON.parse(localStorage.getItem("allPrograms")) || [];
  const newPrograms = programs.filter(
    (newProgram) =>
      existingPrograms &&
      !existingPrograms.some(
        (existingProgram) => existingProgram.id === newProgram.id
      )
  );
  const updatedPrograms = [...existingPrograms, ...newPrograms];
  if (existingPrograms.length === 0) {
    localStorage.setItem("allPrograms", JSON.stringify(updatedPrograms));
    console.log("Programs loaded to local storage without duplicates");
  }
  console.log("Programs loaded to local storage without duplicates");
}

LoadAllProgramsToLocalStorage();

function LoadAllPrograms() {
  const storedPrograms = localStorage.getItem("allPrograms");
  return storedPrograms ? JSON.parse(storedPrograms) : null;
}

function AddProgramToLocalStorage(program) {
  const existingPrograms = LoadAllPrograms() || [];
  const lastProgramId =
    existingPrograms.length > 0
      ? Math.max(...existingPrograms.map((prog) => prog.id))
      : 0;
  const newProgram = {
    id: lastProgramId + 1,
    ...program,
  };

  const updatedPrograms = [...existingPrograms, newProgram];
  localStorage.setItem("allPrograms", JSON.stringify(updatedPrograms));
  console.log("Program added to local storage");
}

function EditProgramInLocalStorage(updatedProgram) {
  const existingPrograms = LoadAllPrograms() || [];
  const updatedPrograms = existingPrograms.map((program) =>
    program.id === updatedProgram.id ? updatedProgram : program
  );
  localStorage.setItem('allPrograms', JSON.stringify(updatedPrograms));
  console.log('Program edited in local storage');
}

function DeleteProgramFromLocalStorage(programId) {
  const existingPrograms = LoadAllPrograms() || [];
  const updatedPrograms = existingPrograms.filter(
    (program) => program.id !== programId
  );
  localStorage.setItem('allPrograms', JSON.stringify(updatedPrograms));
  console.log('Program deleted from local storage');
}

//MARK: User data 

function LoadUserDataToLocalStorage() {
  const existingUserData = JSON.parse(localStorage.getItem("userData")) || [];
  const newUserData = userData.filter(
    (newUser) =>
      existingUserData &&
      !existingUserData.some(
        (existingUser) => existingUser.email === newUser.email
      )
  );
  const updatedUserData = [...existingUserData, ...newUserData];
  if (existingUserData.length === 0) {
    console.log("No existing user data found in local storage");
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    console.log("User data loaded to local storage without duplicates");
  }
}
LoadUserDataToLocalStorage();

//MARK: Classes data 

function LoadAllClassesToLocalStorage() {
  const existingClasses = JSON.parse(localStorage.getItem("allClasses")) || [];
  const newClasses = allClasses.filter(
    (newClass) =>
      existingClasses &&
      !existingClasses.some((existingClass) => existingClass.id === newClass.id)
  );
  const updatedClasses = [...existingClasses, ...newClasses];
  if (existingClasses.length === 0) {
    localStorage.setItem("allClasses", JSON.stringify(updatedClasses));
  }
  console.log("All classes loaded to local storage without duplicates");
}

LoadAllClassesToLocalStorage();

function LoadAllClasses() {
  const storedClasses = localStorage.getItem("allClasses");
  return storedClasses ? JSON.parse(storedClasses) : null;
}

function AddClassToLocalStorage(
  programId,
  description,
  className,
  availableFall,
  availableWinter,
  availableSpring,
  availableSummer
) {
  const existingClasses = LoadAllClasses() || [];
  const lastClassId =
    existingClasses.length > 0
      ? Math.max(...existingClasses.map((cls) => cls.id))
      : 0;
  const newClass = {
    id: lastClassId + 1,
    programId: Number(programId),
    name: className,
    description: description,
    availableFall: availableFall,
    availableWinter: availableWinter,
    availableSpring: availableSpring,
    availableSummer: availableSummer,
  };

  const updatedClasses = [...existingClasses, newClass];
  localStorage.setItem("allClasses", JSON.stringify(updatedClasses));
  console.log("Class added to local storage");
}

function RemoveClassFromLocalStorage(classId) {
  const existingClasses = LoadAllClasses() || [];
  console.log("ClassId=", classId);
  const updatedClasses = existingClasses.filter(
    (classDetails) => Number(classDetails.id) !== Number(classId)
  );
  localStorage.setItem("allClasses", JSON.stringify(updatedClasses));
  console.log("Class removed from local storage");
}

function EditClassFromLocalStorage(
  classId,
  className,
  description,
  availableFall,
  availableWinter,
  availableSpring,
  availableSummer
) {
  const existingClasses = LoadAllClasses() || [];
  const updatedClasses = existingClasses.map((classDetails) => {
    if (Number(classDetails.id) === Number(classId)) {
      return {
        ...classDetails,
        name: className,
        description: description,
        availableFall: availableFall,
        availableWinter: availableWinter,
        availableSpring: availableSpring,
        availableSummer: availableSummer,
      };
    }
    return classDetails;
  });
  localStorage.setItem("allClasses", JSON.stringify(updatedClasses));
  console.log("Class edited in local storage");
}

//MARK: User classes data 

function LoadUserClassesToLocalStorage() {
  const existingUserClasses =
    JSON.parse(localStorage.getItem("userClasses")) || [];
  const newUserClasses = userClasses.filter(
    (newUserClass) =>
      existingUserClasses &&
      !existingUserClasses.some(
        (existingUserClass) => existingUserClass.id === newUserClass.id
      )
  );
  const updatedUserClasses = [...existingUserClasses, ...newUserClasses];
  if (existingUserClasses.length === 0) {
    localStorage.setItem("userClasses", JSON.stringify(updatedUserClasses));
  }
}

LoadUserClassesToLocalStorage();

function LoadUserClasses() {
  const storedUserClasses = localStorage.getItem("userClasses");
  if (!storedUserClasses) {
    LoadUserClassesToLocalStorage();
  }
  return storedUserClasses ? JSON.parse(storedUserClasses) : null;
}

function AddToUserClasses(
  userId,
  classId,
  programId,
  name,
  description,
  termId,
  season
) {
  const existingUserClasses = LoadUserClasses() || [];

  const newUserClass = {
    id: classId,
    userId: userId,
    classId: Number(classId),
    programId: Number(programId),
    name: name,
    description: description,
    userTermId: Number(termId), // Ensure termId is a number
    termSeason: season,
  };

  console.log(newUserClass);
  const updatedUserClasses = [...existingUserClasses, newUserClass];
  localStorage.setItem("userClasses", JSON.stringify(updatedUserClasses));
  console.log("User class added");
}

function DropUserClass(classId, email) {
  const existingUserClasses = LoadUserClasses() || [];

  // Keep classes that do not match both the classId and userId (email)
  const updatedUserClasses = existingUserClasses.filter(
    (userClass) =>
      !(userClass.classId === Number(classId) && userClass.userId === email)
  );

  localStorage.setItem("userClasses", JSON.stringify(updatedUserClasses));
}

//MARK: User sign up data 

// Function to load user data from local storage after signup
export function LoadUserData() {
  const storedUserData = localStorage.getItem("userData");
  return storedUserData ? JSON.parse(storedUserData) : [];
}

// Function to save user data to local storage
export function SaveUserData(newUserData) {
  const existingUserData = LoadUserData();

  // Filter out any existing user with the same email to avoid duplicates
  const filteredUserData = existingUserData.filter(
    (user) => user.email !== newUserData.email
  );

  // Add the new user data to the filtered list
  const updatedUserData = [...filteredUserData, newUserData];

  // Save updated data back to local storage
  localStorage.setItem("userData", JSON.stringify(updatedUserData));
  //set user information to session storage
  sessionStorage.setItem(
    'BVC_Session',
    JSON.stringify({
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      department: newUserData.department,
      program: newUserData.program,
      birthday: newUserData.birthday,
      username: newUserData.username,
      phone: newUserData.phone,
      id: newUserData.id,
      email: newUserData.email,
    })
  );

  console.log("User data saved to local storage.");
}

//MARK: Edit user data / dashboard 

function EditUserDataFromLocalStorage(
  userId,
  firstName,
  lastName,
  phone,
  department,
  email,
  password,
  birthday,
  program,
  username
) {
  const existingUsers = LoadUserData() || [];
  const updatedUsers = existingUsers.map((userDetails) => {
    if (String(userDetails.id) === String(userId)) {
      return {
        ...userDetails,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        department: department,
        email: email,
        password: password,
        birthday: birthday,
        program: program,
        username: username,
      };
    }
    return userDetails;
  });

  localStorage.setItem("userData", JSON.stringify(updatedUsers));
  console.log("User data edited in local storage");
}


export {
  LoadAllPrograms,
  AddProgramToLocalStorage,
  EditProgramInLocalStorage,
  DeleteProgramFromLocalStorage,
  LoadAllClasses,
  LoadUserClasses,
  AddClassToLocalStorage,
  RemoveClassFromLocalStorage,
  EditClassFromLocalStorage,
  AddToUserClasses,
  DropUserClass,
  EditUserDataFromLocalStorage
};
