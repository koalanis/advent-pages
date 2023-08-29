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
      cursor-pointer: default;
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
      background-color:  #1a1b26;
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
  <div class="nes-container is-dark is-centered with-title">

    <p class="title">Advent of Code</p>
    <div class="art">
        ${tree}
    </div>

    ${createMetadataTable(config)}

    <div class="nes-container with-title is-dark">
        <p class="title">progress</p>
        <div>
          ${createProgressSection(config, options)}
        </div>
    </div>

  </div>
</body>
`);


const codeBlock = (filepath: string): string => {
  console.log("filepath", filepath);
  const rp = path.resolve(EXE_ROOT, filepath);
  console.log(rp);
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
  console.log("daysection", paths);
  const dd = Object.entries(paths);
  console.log(dd);
  const data = new Map(dd.filter(([_, val]) => val !== undefined)
                        .map(pth => [pth[0],handleDayProjectFiles(pth[1] || "")]));

  console.log(data);
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


export const dayPage = (config: AdventDayWithKey ) => layout(`
<body>
  <div class="nes-container is-dark is-centered with-title">
    <p class="title">Day - ${config.key}</p>

    <div style="padding-block-end: 2rem"><i class="nes-icon star"></i></div>
    ${daySection(config)}
  </div>
</body>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/ashes.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
`);


const createProgressSection = (config: AdventConfig, options?: GenerateOptions): string => {
  return Object.entries(config.days).map( ([key, day]) => {
    let count = 0;
    if(day.partOneDone) count += 1;
    if(day.partTwoDone) count += 1;

    let star = "is-transparent";
    if(count == 1) star = "is-half";
    if(count == 2) star = "";

    return `
      <a href="${options?.basename || ""}/day${key}${options?.pageSuffix || ""}">
        <i class="nes-icon is-small star ${star}"></i>
      </a>
`;
  }).join("");
}