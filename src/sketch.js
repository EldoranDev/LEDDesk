import { Node } from './node-js/node';
import { Colors } from './node-js/colors';
import { World } from './node-js/world';
import renderContext from './node-js/renderer';

let world = new World();
let env = new p5(renderContext);

env.setData(world);
