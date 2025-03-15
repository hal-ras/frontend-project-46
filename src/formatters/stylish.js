import stringify from './stringify.js';

const stylish = (tree, depth = 1) => {
  const spacesCount = 4;
  const indentSize = depth * spacesCount;
  const indent = ' '.repeat(indentSize - 2);
  const baseIndent = ' '.repeat(indentSize);

  const lines = tree.map((node) => {
    const { key, type, value, oldValue, newValue, children } = node;

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${key}: ${stringify(value, depth + 1)}`;
      case 'changed':
        return `${indent}- ${key}: ${stringify(
          oldValue,
          depth + 1
        )}\n${indent}+ ${key}: ${stringify(newValue, depth + 1)}`;
      case 'nested':
        return `${baseIndent}${key}: {\n${stylish(
          children,
          depth + 1
        )}\n${baseIndent}}`;
      case 'unchanged':
        return `${baseIndent}${key}: ${stringify(value, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return lines.join('\n');
};

export default stylish;
