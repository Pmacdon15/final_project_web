

//MARK: Program data 
async function LoadAllPrograms(isAdmin) {
  let url = "";
  if (isAdmin) url = "http://localhost:5000/api/v1/admin/programs";
  else url = "http://localhost:5000/api/v1/client/programs";

  try {
    const response = await fetch(`${url}`, {
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
//MARK: Load program by id
async function LoadProgramById(programId) {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/guest/programs/${programId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const program = await response.json();
    return program;
  } catch (error) {
    console.error("Failed to load program:", error);
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
async function LoadAllClasses(isAdmin) {
  let url = "";
  if (isAdmin) url = "http://localhost:5000/api/v1/admin/courses";
  else url = "http://localhost:5000/api/v1/client/courses";
  try {
    const response = await fetch(`${url}`, {
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
//MARK: Add class
async function AddClassFunction(
  programId,
  description,
  className,
  availableFall,
  availableWinter,
  availableSpring,
  availableSummer
) {
  const newClass = {
    programId: programId,
    name: className,
    description: description,
    available: {
      fall: availableFall,
      winter: availableWinter,
      spring: availableSpring,
      summer: availableSummer,
    },
  };
  try {
    const response = await fetch(`http://localhost:5000/api/v1/admin/courses`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newClass),
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
async function EditCourse(classId, programId, className, description, availableFall, availableWinter, availableSpring, availableSummer) {
  const updatedClass = {
    id: classId,
    programId: programId,
    name: className,
    description,
    availableFall: availableFall,
    availableWinter: availableWinter,
    availableSpring: availableSpring,
    availableSummer: availableSummer,
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

async function LoadUserClasses(username) {
  try {
    const userClasses = await fetch(`http://localhost:5000/api/v1/client/courses/username/${username}`, {
      method: "GET",
      credentials: "include",
    });

    if (!userClasses.ok) {
      throw new Error(`HTTP error! Status: ${userClasses.status}`);
    }

    const userClassesData = await userClasses.json();
    return userClassesData;
  } catch (error) {
    console.error("Failed to load user classes:", error);
    return null;
  }
}
//MARK: Load courses by program id
async function LoadCoursesByProgramId(programId) {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/client/courses/${programId}`, {

      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      const courses = await response.json();
      return courses;
    }
  } catch (error) {
    console.error("Failed to load courses:", error);
    return null;
  }
}

async function AddToUserCourses(
  username,
  courseId,
  programId,
  name,
  description,
  termId,
  season
) {

  const newUserCourse = {
    id: courseId,
    username: username,
    courseId: Number(courseId),
    programId: Number(programId),
    name: name,
    description: description,
    userTermId: Number(termId), // Ensure termId is a number
    termSeason: season,
  };
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/client/courses/username/${username}/courseId/${courseId}/userTermId/${termId}/termSeason/${season}`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserCourse),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

  } catch (error) {
    console.error("Failed to add user course:", error);
    return null;
  }

}

function DropUserClass(username, classId) {
  console.log('Dropping class:', classId);
  try {
    const response = fetch(`http://localhost:5000/api/v1/client/courses/username/${username}/courseId/${classId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

  } catch (error) {
    console.error("Failed to drop user class:", error);
    return null;
  }

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
//MARK: Load user data by username
async function LoadUserDataByUsername(username) {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/admin/users/username/${username}`, {
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

//MARK: HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//TODO RENAME THIS FUNCTION remove to local storage

async function EditUserDataFromLocalStorage(
  userId,
  username,
  firstName,
  lastName,
  phone,
  department,
  email,
  password,
  birthday,
  program
) {
  const updatedUser = {
    id: userId,
    username: username,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    department: department,
    email: email,
    password: password,
    birthday: birthday,
    program: program,
  };
  try {
    const response = await fetch(`http://localhost:5000/api/v1/admin/users/${userId}`, { // Use classId in the URL
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const editedClass = await response.json();
    // console.log('Class edited:', editedClass);
    return editedClass; // Return the edited class data
  } catch (error) {
    console.error("Failed to edit class:", error);
    return null; // Indicate failure by returning null
  }
}

const RegisterUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      credentials: 'include', // Include cookies if needed
      body: JSON.stringify(userData), // Convert the user data to JSON format
    });

    if (!response.ok) {
      // If the HTTP status is not ok, extract the error message and throw it
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    const data = await response.json(); // Parse the JSON response
    console.log('User successfully registered:', data);

    // Return the response for further use
    return data;
  } catch (error) {
    // Handle errors (network issues or server errors)
    console.error('Error during user registration:', error.message);

    // Optionally, rethrow the error to handle it elsewhere
    throw error;
  }
};


export {
  LoadAllPrograms,
  LoadProgramById,
  AddProgram,
  EditProgram,
  DeleteProgram,
  LoadAllClasses,
  LoadCoursesByProgramId,
  LoadUserClasses,
  AddClassFunction,
  RemoveCourse,
  EditCourse,
  AddToUserCourses,
  DropUserClass,
  LoadUserData,
  LoadUserDataByUsername,
  EditUserDataFromLocalStorage,
  RegisterUser
};
