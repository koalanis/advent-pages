#!/bin/env node

import * as fs from  'fs';
import * as path from  'path';
import { AdventConfig, AdventDayWithKey, Day } from './types';
import { check, mkdir, readFile, rmdir } from './fileUtils';
import { dayPage, homepage } from './partials';

if ('development' === process.env.NODE_ENV) {
  
}

const cwd = () => process.cwd();

const createFile = (p: string, content: string) => {
  try {
    fs.writeFileSync(path.
      resolve(p), content);
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}

const readJson = (p: string) => {
  try {
    
    const data = readFile(path.resolve(p)) || "";
    
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
  return "";
}

function createAdventPages(config?: AdventConfig): void {
  
  if(!config) return;

  let dir_path = path.resolve(cwd(), "advent-pages");
  rmdir(dir_path);
  mkdir(dir_path);
  process.chdir(dir_path);
  
  const homepageHtml = homepage(config, {basename: cwd(), pageSuffix: ".html"});

  
  Object.entries(config.days).forEach((entry) => {
    const [key, dayData] = entry;
    const htmlName = `day${key}.html`;
    const n = parseInt(key);
    const dayMetadata: AdventDayWithKey = ({...dayData, key: n as Day});
    const dayHtml = dayPage(dayMetadata);
    
    createFile(path.resolve(cwd(), htmlName), dayHtml);

  })

  createFile(path.resolve(cwd(), "index.html"), homepageHtml);

}


function checkConfigFile(): AdventConfig | undefined {
  let d = cwd();
  const config_path = path.resolve(d, "advent.config.json");
  if(!check(config_path)) {
    //console.error("no advent.config.json found")
    return undefined;
  }

  const config = readJson(config_path) as AdventConfig;
  
  
  for(let i = 1; i <= 25; i++) {
    config.days[i as Day] = {
      ...config.days[i as Day]
    };
  }

  
  return config;
}

function main() {
  
  const config = checkConfigFile();
  createAdventPages(config);
  
}
main();

