import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import parser from '../src/parser.js';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff flat json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFile('expectedflat.txt').trim();
  expect(gendiff(filepath1, filepath2)).toEqual(expected);
});

test('gendiff flat yml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const expected = readFile('expectedflat.txt').trim();
  expect(gendiff(filepath1, filepath2)).toEqual(expected);
});

test('gendiff unknown format', () => {
  const invalidData = '{}';
  const invalidFormat = '.unknown';

  expect(() => {
    parser(invalidData, invalidFormat);
  }).toThrow('Unknown format');
});
