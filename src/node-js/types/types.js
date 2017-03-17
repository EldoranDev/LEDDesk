import OutputNode from './OutputNode';
import DuplicatorNode from './DuplicatorNode';
import NumberNode from './NumberNode';
import ColorNode from './ColorNode';

const types = {
  OutputNode,
  DuplicatorNode,
  NumberNode,
  ColorNode,
};

console.log(types);

const Factory = (type, params, options) => {
  return new types[type](params, options);
};

export {
  OutputNode,
  DuplicatorNode,
  NumberNode,
  ColorNode,
  Factory,
  types
};