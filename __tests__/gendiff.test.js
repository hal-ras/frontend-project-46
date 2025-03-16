import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import parse from '../src/parser.js';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  describe('stylish', () => {
    test('json', () => {
      const expected = readFile('expected-stylish.txt').trim();
      expect(gendiff('file1.json', 'file2.json', 'stylish')).toEqual(expected);
    });

    test('yml', () => {
      const expected = readFile('expected-stylish.txt').trim();
      expect(gendiff('file1.yml', 'file2.yml', 'stylish')).toEqual(expected);
    });
  });

  describe('plain', () => {
    test('json', () => {
      const expected = readFile('expected-plain.txt').trim();
      expect(gendiff('file1.json', 'file2.json', 'plain')).toEqual(expected);
    });

    test('yml', () => {
      const expected = readFile('expected-plain.txt').trim();
      expect(gendiff('file1.yml', 'file2.yml', 'plain')).toEqual(expected);
    });
  });

  test('unknown format', () => {
    const invalidData = '{}';
    const invalidFormat = '.unknown';
    expect(() => {
      parse(invalidData, invalidFormat);
    }).toThrow('Unknown format');
  });
});
