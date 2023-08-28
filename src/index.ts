import * as fs from  'fs';
import * as path from  'path';
import * as rimraf from 'rimraf';

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

console.log(sum(1,3))

const check = (path: string): boolean => {
  try {
    return fs.existsSync(path);
  } catch (err) {
    console.error(err);
    return false;
  }
}

const mkdir = (path: string) => {
  
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  } catch (err) {
    console.error(err);
  }
};

const rmdir = (dir: string) => {
  try {
    if (fs.existsSync(dir)) {
      rimraf.sync(dir);
    }
  } catch (err) {
    console.error(err);
  }
}

const asciiTree = (`
             /\\
            <..>
             \\/
             /\\
            /..\\
           /++++\\
          /..()..\\
          /......\\
         /~'~'~'~'\\
        /..()..()..\\
        /..........\\
       /*&*&*&*&*&*&\\
      /..()..()..()..\\
      /..............\\
     /++++++++++++++++\\
    /..()..()..()..()..\\
    /..................\\
   /~'~'~'~'~'~'~'~'~'~'\\
  /..()..()..()..()..()..\\
  /*&*&*&*&*&*&*&*&*&*&*&\\
 /........................\\
/,.,.,.,.,.,.,.,.,.,.,.,.,.\\
           |   |
           |'''|
         \\_____/

`);

const paintOrnaments = (str: string): string => {
  return str.split("()")
            .join(`<span class='blue'>()</span>`)
            .split("*")
            .join("<span class='nes-text is-disabled'>*</span>")
            .split("&")
            .join("<span class='white'>&</span>")
};
const tree = asciiTree.split('\n')
  .map((ele, idx) => {
    // star
    if(idx <= 3) return `<span class="nes-text is-warning">${ele}</span>`;
    // base
    if(idx >= 23) return `<span class="nes-text is-error">${ele}</span>`
    // middle
    if(idx % 2 == 0) return `<span class="nes-text off-green">${paintOrnaments(ele)}</span>`;
    return `<span class="nes-text green">${paintOrnaments(ele)}</span>`;
  })
  .map(i => `${i}<br/>`).join("\n");


const createMetadataTable = (config: AdventConfig) => {
  return `
      <div class="nes-table-responsive" style="margin-bottom: 2rem;">
            <table style="margin: auto;" class="container-center nes-table is-bordered is-dark is-centered">
              <thead>
                <tr>
                  <th>language</th>
                  <th>year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${config.lang}</td>
                  <td>${config.year}</td>
                </tr>
            </table>
      </div>
  `;
};
const content = (config: AdventConfig) => `
  <html>
    <head>
        <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
        <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&family=VT323&display=swap" rel="stylesheet">

        <style>
          html {
            cursor-pointer: default;
          }
          body {
            background-color: #212529;
            color: #ffffff;
            width: 80%;
            margin-inline: auto;
            padding-block: 4rem;
          }
          .art {
            line-height: 1rem;
            font-family: 'Roboto Mono', monospace;
          }
          .green {
            color: #518706;
          }
          .white {
            color: #ffffff;
          }
          .container-center {
            margin: auto;
            margin-bottom: 1.5rem;
          }
          .red {
            color: #aa4444
          }
          .blue {
            color: #4444aa
          }
          .gold {
            color: #f7d51d;
          }
          .off-green {
            color: #92cc41;
          }
          .nes-container {
            background-color: #ffffff;
          }
        </style>
    </head>
    <body>
      <div class="nes-container is-dark is-centered with-title">
      <p class="title">Advent of Code</p>
      <div class="art">
          ${tree}
      </div>
      
      ${createMetadataTable(config)}

      <div class="nes-container with-title is-dark">
          <p class="title">progress</p>
          <div>
            ${createProgressSection(config)}
          </div>
      </div>
      
    </div>
    </body>
  </html>
`;


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
    const data = fs.readFileSync(
        path.resolve(p), 
        'utf-8'
    );
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
  return "";
}

function createAdventPages(config?: AdventConfig): void {
  console.log(config);
  if(!config) return;

  let d = cwd();
  let dir_path = path.resolve(d, "advent-pages");
  rmdir(dir_path);
  mkdir(dir_path);
  process.chdir(dir_path);
  createFile(path.resolve(cwd(), "index.html"), content(config));
}
type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;
type AdventDay = {    
    partOneDone: boolean;
    partTwoDone: boolean;

    testDataOne?: string | string[]
    codeOne?: string | string[];
    answerOne?: string | string[];
    
    testDataTwo?: string | string[]
    codeTwo?: string | string[];
    answerTwo?: string | string[];
}

type AdventConfig = {
  lang: string;
  year: number;

  days: {
    [K in Day]: AdventDay
  }
};

function checkConfigFile(): AdventConfig | undefined {
  let d = cwd();
  const config_path = path.resolve(d, "advent.config.json");
  if(!check(config_path)) {
    console.error("no advent.config.json found")
    return undefined;
  }

  const config = readJson(config_path);
  console.log(config)
  for(let i = 1; i <= 25; i++) {
    if(!(i in config.days)) {
      config.days[`${i}`] = {
        partOneDone: false,
        partTwoDone: false
      };
    }
  }
  return config;
}

function main() {

  const config = checkConfigFile();
  createAdventPages(config);
}
main();

function createProgressSection(config: AdventConfig): string {
  return Object.entries(config.days).map( ([_, day]) => {
    let count = 0;
    if(day.partOneDone) count += 1;
    if(day.partTwoDone) count += 1;

    let star = "is-transparent";
    if(count == 1) star = "is-half";
    if(count == 2) star = "";

    return `
      <i class="nes-icon is-small star ${star}"></i>
    `;
  }).join("");
}
