import programs from '../load-data/programs.data.json';
import myPrograms from '../load-data/myPrograms.data.json';

function LoadAllPrograms() {
  return programs;
}

function LoadMyPrograms(email) {
    // TODO: Add data to /load-data/myPrograms.data.json
    // TODO: fetch my programs from the myPrograms.data.json file using email 
  return myPrograms;
}


export { LoadAllPrograms, LoadMyPrograms };