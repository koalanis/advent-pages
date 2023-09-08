# 🎅 advent-pages 🎄
### a simple advent-of-code project site generator
<img width="1435" alt="image" src="https://github.com/koalanis/advent-pages/assets/5452212/f53531db-e31b-481e-95d1-5edbbf3d43c5">

## How it works
This project builds a node script (dist/index.js) that scans a directory for a `advent.config.json` file and uses metadata in that file to generate a static site to the folder `advent-pages`. 

The metadata provided allows you to specify which code file corresponds to a advent problem and solution and renders it in a standalone page. Configuration uses relative pathing to where the script process is running. 
<img width="1314" alt="image" src="https://github.com/koalanis/advent-pages/assets/5452212/8d8f082d-8d56-46b0-8b26-87c2aa17ed40">

## Get started
### Installing 
Install the package and run the `generate` command to create the site folder.
```sh
npm install --save @koalanis/advent-pages
npx @koalanis/advent-pages generate
```

### Configuration
The static site's metadata is configured in a `advent.config.json` file.
```json
{
  "lang": "rust",
  "year": 2021,
  "days": {
    "1": {
       "partOneDone": true,
       "testDataOne": "./test_data.txt",
       "codeOne": "./src/day1/partone.rs",
       "answerOne": "./answer.txt",

       "partTwoDone": true,
       "testDataTwo": "./test_data_2.txt",
       "codeTwo": "./src/day1/parttwo.rs",
       "answerTwo": "./answer_2.txt",
    },
    ...
    "25": {...}
  }
}
```
The fields `days[n].partOneDone` and `days[n].partTwoDone` are booleans that signify if a problem has been compelted, which in turn effects how the completion stars are rendered on the static site. 

The other fields in `days[n]`, such as `testDataOne`, `codeOne`, etc, are relative paths that are used to inject source text blobs into the static site for display. You can use this to display your advent data & answers, and most importantly, your code solutions. 

### Github workflow
You can configure this static site generator to work in combination of a github pages. You can add an action to publish the static onto your advent of code github repos. For a template of doing this, take a look at my [starter](https://github.com/koalanis/advent-template).

#### Example
Python Advent of Code 2015 [link](https://koalanis.github.io/advent-python-2015/)

## details
- built using [tsup](https://tsup.egoist.dev/)
- default styling using [NES.css](https://nostalgic-css.github.io/NES.css/)
- templating using native ts/js string templating

## roadmap
- [x] publish npm package
- [ ] add custom theming support


## lastly
the static site is styled in [NES.css](https://github.com/nostalgic-css/NES.css)https://github.com/nostalgic-css/NES.css 
🙏 thanks to the nostalgic-css team  

