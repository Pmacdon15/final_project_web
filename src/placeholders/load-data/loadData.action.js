import programs from '../load-data/programs.data.json';
import userPrograms from '../load-data/userPrograms.data.json';
import allClasses from '../load-data/allClasses.data.json';

function LoadAllPrograms() {
  return programs;
}

function LoadUserPrograms(email) {
    // TODO: Add data to /load-data/myPrograms.data.json
    // TODO: fetch my programs from the myPrograms.data.json file using email 
  return userPrograms;
}

function LoadAllClasses() {
  return allClasses;
}

export { LoadAllPrograms, LoadUserPrograms, LoadAllClasses };