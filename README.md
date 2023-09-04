# 🎅 advent-pages 🎄
### an advent-of-code project site generator
<img width="834" alt="image" src="https://github.com/koalanis/advent-pages/assets/5452212/57f9aa2b-a1e7-417b-a69a-4b070d2742a4">



## Get started
### Installing 
Install the package and run the `generate` command to create the site folder.
```sh
npm install --save @koalanis/advent-pages
npx @koalanis/advent-pages generate
```

## Configuration
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
The fields `days[n].partOneDone` and `days[n].partOneTwo` are booleans that signify if a problem has been compelted, which in turn effects how the completion stars are rendered on the static site. 

The other fields in `days[n]`, such as `testDataOne`, `codeOne`, etc, are relative paths that are used to inject source text blobs into the static site for display. You can use this to display your advent data & answers, and most importantly, your code solutions. 

## details
- built using [tsup](https://tsup.egoist.dev/)
- default styling using [NES.css](https://nostalgic-css.github.io/NES.css/)

## roadmap
- [x] publish npm package
- [ ] add custom theming support
- [ ] 

## lastly
the static site is styled in [NES.css](https://github.com/nostalgic-css/NES.css)https://github.com/nostalgic-css/NES.css 
🙏 thanks to the nostalgic-css team  

