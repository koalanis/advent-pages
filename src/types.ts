export type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;

export type AdventSourcePaths = {
  testDataOne?: string | string[]
  codeOne?: string | string[];
  answerOne?: string | string[];
  
  testDataTwo?: string | string[]
  codeTwo?: string | string[];
  answerTwo?: string | string[];
}

export type AdventDay = AdventSourcePaths & {    
    partOneDone: boolean;
    partTwoDone: boolean;
}

export function isString(value: string | string[]): value is string {
  return typeof value === 'string';
}

export function isStringArray(value: string | string[]): value is string[] {
  return Array.isArray(value);
}

export type AdventDayWithKey = AdventDay & {    
  key: Day;
}

export type AdventConfig = {
  lang: string;
  year: number;

  days: {
    [K in Day]: AdventDay
  }
};

export const getPathsFromConfig = (config: AdventDay | AdventDayWithKey): AdventSourcePaths => {
  return {
    testDataOne: config.testDataOne,
    codeOne: config.codeOne,
    answerOne: config.answerOne,

    testDataTwo: config.testDataTwo,
    codeTwo: config.codeTwo,
    answerTwo: config.answerTwo,
  };
}