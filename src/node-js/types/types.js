import OutputNode from './OutputNode';
import DuplicatorNode from './DuplicatorNode';
import NumberNode from './NumberNode';
import ColorNode from './ColorNode';
import RGBSplitNode from './RGBSplitNode';
import RGBCombineNode from './RGBCombineNode';

const types = {
  OutputNode,
  DuplicatorNode,
  NumberNode,
  RGBSplitNode,
  RGBCombineNode,
  ColorNode,
};

console.log(types);

const Factory = (type, params, options) => {
  return new types[type](params, options);
};

export {
  Factory,
  types
};