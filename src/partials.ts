import { AdventConfig, AdventDayWithKey, getPathsFromConfig, isString, isStringArray } from "./types";
import * as path from  'path';
import { EXE_ROOT, readFile } from "./fileUtils";
const g = (str: string): string => `<span class="gold">${str}</span>`
const r = (str: string): string => `<span class="red">${str}</span>`
const b = (str: string): string => `<span class="blue">${str}</span>`
const br = (str: string): string => `<span class="brown">${str}</span>`

const asciiTree = (`
        ${g("/\\")}
       ${g("<..>")}
       ${g("\\/")}
             /\\
            /..\\
           /++++\\
          /..${r('()')}..\\
          /......\\
         /~'~'~'~'\\
        /..${r('()')}..${b('()')}..\\
        /..........\\
       /*&*&*&*&*&*&\\
      /..${r('()')}..${b('()')}..${r('()')}..\\
      /..............\\
     /++++++++++++++++\\
    /..${r('()')}..${b('()')}..${r('()')}..${b('()')}..\\
    /..................\\
   /~'~'~'~'~'~'~'~'~'~'\\
  /..${r('()')}..${b('()')}..${r('()')}..${b('()')}..${r('()')}..\\
  /*&*&*&*&*&*&*&*&*&*&*&\\
 /........................\\
/,.,.,.,.,.,.,.,.,.,.,.,.,.\\
     ${br('|   |')}
     ${br('|   |')}
    ${r('\\_____/')}
`);

const paintRibbon = (str: string): string => {
  return str
            .split("*")
            .join("<span class='nes-text is-disabled'>*</span>")
            .split("&")
            .join("<span class='white'>&</span>")
};
const tree = asciiTree.split('\n')
  .map((ele, idx) => {
    // star
    // if(idx <= 3) return `<span class="nes-text is-warning">${ele}</span>`;
    // base
    if(idx >= 23) return `<span class="nes-text is-error">${ele}</span>`
    // middle
    if(idx % 2 == 0) return `<span class="nes-text off-green">${paintRibbon(ele)}</span>`;
    return `<span class="nes-text green">${paintRibbon(ele)}</span>`;
  })
  .map(i => `${i}<br/>`).join("\n");


const createStyle = (): string => `
<style>
    html {
      cursor: default;
    }
    a {
      cursor: pointer;
    }
    pre,code {
      font-family: 'Roboto Mono', monospace;
      text-align: left;
    }
    body {
      background-color: #1a1b26;
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
    .brown {
      color: #8b4513;
    }
    .progress-section {
      display: flex;
      justify-content: center;
      gap: 1%;
      flex-wrap: wrap;
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
    .aoc-banner {
      text-align: center;
    }
    .nes-container.is-dark{
      background-color:  #1a1b26;
    }
    .nes-container.is-dark::after{
      background-color:  #1a1b26;
    }
    .art{
      text-align: center;
    }
    .nes-container.is-dark.with-title > .title   {
      background-color:  #1a1b26;
    }
    .hljs {
      background-color:  #1a1b26 !important;
    }
</style>
`;

const layout = (bodyPartial: string): string => `
<html>
  <head>
      <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
      <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&family=VT323&display=swap" rel="stylesheet">

      ${createStyle()}
      
  </head>
  <body>
    ${bodyPartial}
  </body>
</html>
`;

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

type GenerateOptions = {
  basename?: string;
  pageSuffix?: string;
}

export const homepage = (config: AdventConfig, options?: GenerateOptions) => layout(`
<body>
  <div class="">

    <h1 class="aoc-banner">Advent of Code</h1>
    <div class="art">
        ${tree}
    </div>

    ${createMetadataTable(config)}

    <div class="nes-container with-title is-dark">
        <p class="title">progress</p>
        <div class="progress-section">
          ${createProgressSection(config, options)}
        </div>
    </div>

  </div>
</body>
`);

const codeBlock = (filepath: string): string => {
  const rp = path.resolve(EXE_ROOT, filepath);
  const data = readFile(rp);
  return `
    <pre>
      <code>
${data}
      </code>
    </pre>
  `;
};

const handleDayProjectFiles = (paths: string | string[]): string => {
  if(isString(paths)) {
    return codeBlock(paths)
  } else if(isStringArray(paths) ) {
    return paths.map(s => codeBlock(s)).join("\n");
  }
  return "";
}

const dayCodeSection = (title: string, code: string) => {
  return `
    <div class="nes-container with-title is-dark">
      <p class="title">${title}</p>
      ${code}
    </div>
`;
};
const daySection = (config: AdventDayWithKey) => {
  const paths = getPathsFromConfig(config);
  const dd = Object.entries(paths);
  const data = new Map(dd.filter(([_, val]) => val !== undefined)
                        .map(pth => [pth[0],handleDayProjectFiles(pth[1] || "")]));

  const empty = !Array.from(data.values()).some(i => i!==undefined);
  return `
  ${!!empty ? '<div> No solution yet </div>' : ""}
  
  ${!!data.get("testDataOne") ? dayCodeSection("Part 1 - Data", data.get("testDataOne") || "") : ""}
  ${!!data.get("codeOne") ? dayCodeSection("Part 1 - Code", data.get("codeOne") || "") : ""}
  ${!!data.get("answerOne") ? dayCodeSection("Part 1 - Answer", data.get("answerOne") || "") : ""}

  ${!!data.get("testDataTwo") ? dayCodeSection("Part 2 - Data", data.get("testDataTwo") || "") : ""}
  ${!!data.get("codeTwo") ? dayCodeSection("Part 2 - Code", data.get("codeTwo") || "") : ""}
  ${!!data.get("answerTwo") ? dayCodeSection("Part 2 - Answer", data.get("answerTwo") || "") : ""}

`;
};


export const dayPage = (config: AdventDayWithKey ) => {
  let count = 0;
  if(config.partOneDone) count += 1;
  if(config.partTwoDone) count += 1;

  let star = "is-transparent";
  if(count == 1) star = "is-half";
  if(count == 2) star = "";

  return layout(`
<body>
  <a href="./index.html">back home</a>
  <div class="aoc-banner ">
    <p class="title">Day - ${config.key}</p>

    <div style="padding-block-end: 2rem">
      <i class="nes-icon star ${star}"></i>
    </div>
    ${daySection(config)}
  </div>
</body>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/tomorrow-night-blue.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
`)};


const createProgressSection = (config: AdventConfig, options?: GenerateOptions): string => {
  return Object.entries(config.days).map( ([key, day]) => {
    let count = 0;
    if(day.partOneDone) count += 1;
    if(day.partTwoDone) count += 1;

    let star = "is-transparent";
    if(count == 1) star = "is-half";
    if(count == 2) star = "";

    return `
      <a href="./day${key}${options?.pageSuffix || ""}">
        <i class="nes-icon is-small star ${star} hi"></i>
      </a>
`;
  }).join("");
}
