import { Factory } from './types/types';
import { Connection } from './connection';

export class World {

  constructor() {
    this.nodes = [];
    this.connections = [];
  }

  toJSON(){
    return {
      nodes: this.nodes,
      connections: this.connections
    };
  }

  serialize() {
    return btoa(JSON.stringify(this));
  }

  load(data) {
    let d = JSON.parse(atob(data));
    let dummy = new World();

    let nodes = [];
    let connections = [];
    
    for(let i = 0; i < d.nodes.length; i++) {
      let node = Factory(d.nodes[i].type, d.nodes[i].params, d.nodes[i].options);
      node.id = d.nodes[i].id;
      nodes.push(node);
    }

    for(let i = 0; i < d.connections.length; i++) {
      let output = null,
          input = null;

      //Search output
      for(let j = 0; j < nodes.length; j++) {
        for(let k = 0; k < nodes[j].outputs.length; k++) {
          if(d.connections[i].output == nodes[j].outputs[k].id) {
            output = nodes[j].outputs[k];
            j = nodes.length;
            break;
          }
        }
      }

      // Search input
      for(let j = 0; j < nodes.length; j++) {
        for(let k = 0; k < nodes[j].inputs.length; k++) {
          if(d.connections[i].input == nodes[j].inputs[k].id) {
            input = nodes[j].inputs[k];
            j = nodes.length;
            break;
          }
        }
      }

      new Connection(dummy, output, input);
    }

    this.nodes = nodes;
    this.connections = dummy.connections;

    console.log("Finished Loading");
  }
}