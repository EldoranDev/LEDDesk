import OutputNode from './OutputNode';
import DuplicatorNode from './DuplicatorNode';
import NumberNode from './NumberNode';
import ColorNode from './ColorNode';
import RGBSplitNode from './RGBSplitNode';
import RGBCombineNode from './RGBCombineNode';
import CounterNode from './CounterNode';
import SinNode from './SinNode';
import AbsNode from './AbsNode';
import MapNode from './MapNode';

const types = {
  OutputNode,
  DuplicatorNode,
  NumberNode,
  RGBSplitNode,
  RGBCombineNode,
  ColorNode,
  CounterNode,
  AbsNode,
  MapNode,
  SinNode,
};

console.log(types);

const Factory = (type, params, options) => {
  return new types[type](params, options);
};

export {
  Factory,
  types
};