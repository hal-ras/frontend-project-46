import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parser.js';
import formatters from './formatters/index.js';

const buildTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        children: buildTree(obj1[key], obj2[key]),
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key,
        type: 'changed',
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
};

export default (filepath1, filepath2, format = 'stylish') => {
  const content1 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', filepath2), 'utf-8');
  const parsedData1 = parse(content1, path.extname(filepath1));
  const parsedData2 = parse(content2, path.extname(filepath2));

  const tree = buildTree(parsedData1, parsedData2);
  const formatter = formatters[format];

  if (!formatter) {
    throw new Error(
      `Unknown format: ${format}`
    );
  }
  return formatter(tree);
};
