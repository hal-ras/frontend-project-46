import path from 'path';
import fs from 'fs';
import parser from './parser.js';

export default (filepath1, filepath2) => {
    const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
    const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
    const parsedData1 = parser(content1);
    const parsedData2 = parser(content2);
    console.log(parsedData1);
    console.log(parsedData2);
    return content1 === content2;
};