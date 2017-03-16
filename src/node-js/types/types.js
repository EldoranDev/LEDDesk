import OutputNode from './OutputNode';
import DuplicatorNode from './DuplicatorNode';
import NumberNode from './NumberNode';

const types = {
  OutputNode,
  DuplicatorNode,
  NumberNode,
};

const Factory = (type, params, options) => {
  return new types[type](params, options);
};

export {
  OutputNode,
  DuplicatorNode,
  NumberNode,
  Factory,
  types
};