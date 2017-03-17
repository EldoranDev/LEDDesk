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
import TimeNode from './TimeNode';
import HourNode from './HourNode';
import MinuteNode from './MinuteNode';
import SecondNode from './SecondNode';
import GreaterNode from './GreaterNode';


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
  TimeNode,
  HourNode,
  MinuteNode,
  SecondNode,
  GreaterNode
};

console.log(types);

const Factory = (type, params, options) => {
  return new types[type](params, options);
};

export {
  Factory,
  types
};