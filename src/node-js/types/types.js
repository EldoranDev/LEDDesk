import OutputNode from './OutputNode';
import DuplicatorNode from './DuplicatorNode';
import NumberNode from './NumberNode';

const classes = {
  OutputNode,
  DuplicatorNode,
  NumberNode,
};

const Factory = (type, params, options) => {
  return new classes[type](params, options);
};

export {
  OutputNode,
  DuplicatorNode,
  NumberNode,
  Factory
};