
import userClasses from "./userClasses.data.json";

//MARK: Program data 
async function LoadAllPrograms() {
  try {
    const response = await fetch("http://localhost:5000/api/v1/admin/programs", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const programs = await response.json();
    return programs;
  } catch (error) {
    console.error("Failed to load programs:", error);
    return null;
  }
}

//MARK: Add program
async function AddProgram(program) {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/admin/programs`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(program),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const newProgram = await response.json();
    console.log('Program added: ' + newProgram);
    return newProgram;
  } catch (error) {
    console.error("Failed to add program:", error);
    return null;
  }
}
//MARK: Edit program
async function EditProgram(updatedProgram) {
  console.log('Updated program: ' + updatedProgram);
  try {
    const response = await fetch(`http://localhost:5000/api/v1/admin/programs/${updatedProgram.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProgram),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const newProgram = await response.json();
    console.log('Program added: ' + newProgram);
    return newProgram;
  } catch (error) {
    console.error("Failed to add program:", error);
    return null;
  }
}
//MARK: Delete program
async function DeleteProgram(programId) {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/admin/programs/${programId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const programs = await response.json();
    return programs;
  } catch (error) {
    console.error("Failed to delete programs:", error);
    return null;
  }
}


//MARK: Classes data 
async function LoadAllClasses() {
  try {
    const response = await fetch("http://localhost:5000/api/v1/admin/Courses", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const programs = await response.json();
    return programs;
  } catch (error) {
    console.error("Failed to loading  Courses:", error);
    return null;
  }
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

async function RemoveCourse(courseId) {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/admin/courses/${courseId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const programs = await response.json();
    return programs;
  } catch (error) {
    console.error("Failed to delete courses:", error);
    return null;
  }
}
//MARK: Edit course
async function EditCourse(classId, className, description, availableFall, availableWinter, availableSpring, availableSummer) {
  const updatedClass = {
    id: classId, // Assuming classId is the identifier for the class
    name: className,
    description, // Shorthand property assignment
    available: {
      fall: availableFall,
      winter: availableWinter,
      spring: availableSpring,
      summer: availableSummer,
    },
  };

  try {
    const response = await fetch(`http://localhost:5000/api/v1/admin/courses/${classId}`, { // Use classId in the URL
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedClass),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const editedClass = await response.json();
    console.log('Class edited:', editedClass);
    return editedClass; // Return the edited class data
  } catch (error) {
    console.error("Failed to edit class:", error);
    return null; // Indicate failure by returning null
  }
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

//MARK: Load Users data
async function LoadUserData() {
  try {
    const response = await fetch("http://localhost:5000/api/v1/admin/users", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const programs = await response.json();
    return programs;
  } catch (error) {
    console.error("Failed to load users:", error);
    return null;
  }
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
  AddProgram,
  EditProgram,
  DeleteProgram,
  LoadAllClasses,
  LoadUserClasses,
  AddClassToLocalStorage,
  RemoveCourse,
  EditCourse,
  AddToUserClasses,
  DropUserClass,
  LoadUserData,
  EditUserDataFromLocalStorage
};
