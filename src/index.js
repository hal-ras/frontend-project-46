import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parser from './parser.js';

export default (filepath1, filepath2) => {
  const content1 = fs.readFileSync(
    path.resolve(process.cwd(), '__fixtures__', filepath1),
    'utf-8'
  );
  const content2 = fs.readFileSync(
    path.resolve(process.cwd(), '__fixtures__', filepath2),
    'utf-8'
  );
  const parsedData1 = parser(content1, path.extname(filepath1));
  const parsedData2 = parser(content2, path.extname(filepath2));

  const genDiff = (obj1, obj2) => {
    const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

    const diff = keys.map((key) => {
      if (!Object.hasOwn(obj2, key)) {
        return `  - ${key}: ${obj1[key]}`;
      }
      if (!Object.hasOwn(obj1, key)) {
        return `  + ${key}: ${obj2[key]}`;
      }
      if (obj1[key] !== obj2[key]) {
        return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
      }
      return `    ${key}: ${obj1[key]}`;
    });
    return `{\n${diff.join('\n')}\n}`;
  };
  return genDiff(parsedData1, parsedData2);
};
