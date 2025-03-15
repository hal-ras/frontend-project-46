import _ from 'lodash';

const stringify = (value, depth) => {
  const spacesCount = 4;
  const indentSize = depth * spacesCount;
  const indent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - spacesCount);

  if (!_.isObject(value)) {
    return String(value);
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`
  );

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

export default stringify;
