import { Node } from './node-js/node';
import { Colors } from './node-js/colors';
import { World } from './node-js/world';

const fs = require('fs');

import renderContext from './node-js/renderer';

import { ipcRenderer } from 'electron';

let debug = require('debug')('leddesk');

import { OutputNode, DuplicatorNode, NumberNode } from './node-js/types/types';

let world = new World();
let env = new p5(renderContext);

ipcRenderer.on('file', (e, file) => {
    let data = fs.readFileSync(file[0]);

    world.load(data);
});

ipcRenderer.on('save', (e, msg) => {
    fs.writeFileSync(msg, world.serialize());
});

ipcRenderer.on('system', (e, cmd) => {
    switch(cmd) {
        case 'new':
            world.clear();
            break;
    }
});

env.setData(world);
