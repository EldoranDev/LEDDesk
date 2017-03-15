import { Node } from './node-js/node';
import { Colors } from './node-js/colors';
import { World } from './node-js/world';
import renderContext from './node-js/renderer';

import { OutputNode, DuplicatorNode, NumberNode } from './node-js/types/types';

let world = new World();
let env = new p5(renderContext);

env.setData(world);
