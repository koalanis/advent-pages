import  {existsSync, mkdirSync, readFileSync} from  'fs';
import {sync as rimraf} from 'rimraf';
export const EXE_ROOT = process.cwd();


export const check = (path: string): boolean => {
  try {
    return existsSync(path);
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const readFile = (path: string): string | undefined => {
  
  try {
    if (existsSync(path)) {
      console.log(`${path} file exists`);
      return readFileSync(
        path, 
        'utf-8'
      );
    } else {
      console.log(`${path} does not exist`);

    }
  } catch (err) {
    console.error("reading errors", err);
  }
  return undefined;
}

export const mkdir = (path: string) => {
  
  try {
    if (!existsSync(path)) {
      mkdirSync(path);
    }
  } catch (err) {
    console.error(err);
  }
};

export const rmdir = (dir: string) => {
  try {
    if (existsSync(dir)) {
      rimraf(dir);
    }
  } catch (err) {
    console.error(err);
  }
}