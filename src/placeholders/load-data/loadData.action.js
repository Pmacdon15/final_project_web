import programs from '../load-data/programs.data.json';
import usersPrograms from '../load-data/userPrograms.data.json';
import allClasses from '../load-data/allClasses.data.json';
import allUsers from '../authentication/user.data.json';

function LoadAllPrograms() {
  return programs;
}

function LoadUserPrograms(email) {
    // TODO: Add data to /load-data/userPrograms.data.json
    // TODO: fetch my programs from the myPrograms.data.json file using email 
  const userPrograms = usersPrograms.filter(userProgram => userProgram.email === email);
  return userPrograms;
}

function LoadAllClasses() {
  return allClasses;
}

function LoadUserInfos(email) {
  const userInfos = allUsers.filter(user => user.email === email);
  return userInfos;
}

export { LoadAllPrograms, LoadUserPrograms, LoadAllClasses, LoadUserInfos };