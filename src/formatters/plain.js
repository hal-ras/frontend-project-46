import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree, path = '') => {
  const lines = tree.flatMap((node) => {
    const { key, type, value, oldValue, newValue, children } = node;
    const fullPath = path ? `${path}.${key}` : key;

    switch (type) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${formatValue(
          value
        )}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${formatValue(
          oldValue
        )} to ${formatValue(newValue)}`;
      case 'nested':
        return plain(children, fullPath);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return lines.join('\n');
};

export default plain;
