const CONNECTOR_SIZE = 15;

let nodes;
let connections = [];

let NodeTypes = {
  "ColorNode": ColorNode,
  "RGBSplitterNode": RGBSplitterNode,
  "CounterNode": CounterNode,
  "SinNode": SinNode,
  "MapNode": MapNode,
  "AddNode": AddNode,
  "ModNode": ModNode
};

let currentlyClicked = null;
let currentConnector = null;
let selected = null;

let menuState = 0;
let menuPos;
const menu = document.querySelector('#context-menu');
const active = 'context-menu--active';

function setup()
{
   let render = createCanvas(800,600);

  nodes = [
    new OutputNode(590, 250),
  ];

  menuPos = createVector();
  render.canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    toggleMenuOn();

    menu.style.left = mouseX + "px";
    menu.style.top = mouseY + "px";
  });
  textFont('Roboto');
  addListeners();
}

function draw() 
{
  background("#314456"); // Redraw Frame

  if(mouseIsPressed && currentlyClicked != null) {
    currentlyClicked.mouseMove();
  }

  for(let i = 0; i < nodes.length; i++) {
    nodes[i].show(); // Show all Nodes
  }

  push();
  for(let i = 0; i < connections.length; i++) {
    let c = connections[i];

    strokeWeight(3);
    noFill();
    c.update();
    bezier(c.output.center.x, c.output.center.y, c.output.center.x + 100, c.output.center.y, c.input.center.x - 100, c.input.center.y, c.input.center.x, c.input.center.y);
  }
  pop();

  push();
  if(currentConnector != null) {    
    stroke(currentConnector.color);
    strokeWeight(3);
    line(currentConnector.center.x, currentConnector.center.y, mouseX, mouseY);
  }
  pop();
}

function mousePressed() {
  // check if inside of title bar of Node or inside of Connector

  if(menuState === 1) {
    if(!(
      mouseX > menuPos.x && mouseX < menuPos.x + menu.offsetWidth &&
      mouseY > menuPos.y && mouseY < menuPos.y + menu.offsetHeight
    )) {
      toggleMenuOff();
    }
  }
  //toggleMenuOff();

  currentlyClicked = null;

  if(selected != null) {
    selected.selected = false;
  }

  selected = null;
  

  for(let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    if(
      mouseX > node.x - CONNECTOR_SIZE/2 && mouseX < node.x + node.width + CONNECTOR_SIZE/2 &&
      mouseY > node.y && mouseY < node.y + node.height
    ) {
      selected = node;
      node.selected = true;
      // inside of node
      
      if(
        mouseX > node.x && mouseX < node.x + nodes[i].width &&
        mouseY > node.y && mouseY < node.y + 20
      ) {
        // Inside of Title -> Drag
        node.mouseDown();
        currentlyClicked = nodes[i];
      }

      for(let j = 0; j < node.inputs.length; j++) {
        if( pow(mouseX - node.inputs[j].center.x, 2) + pow(mouseY - node.inputs[j].center.y, 2) < 25) {
          currentConnector = node.inputs[j];
          break;
        }
      }

      for(let j = 0; j < node.outputs.length; j++) {
        if( pow(mouseX - node.outputs[j].center.x, 2) + pow(mouseY - node.outputs[j].center.y, 2) < 25) {
          currentConnector = node.outputs[j];
          break;
        }
      }

      break;
    }
  }
}

function mouseReleased() {
  if(currentlyClicked != null) {
    currentlyClicked = null;  
  }

  if(currentConnector != null) {
    if(currentConnector instanceof Output) {
      for(let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if(
          mouseX > node.x - 5 && mouseX < node.x + node.width + 5 &&
          mouseY > node.y && mouseY < node.y + node.height
        ) {
          for(let j = 0; j < node.inputs.length; j++) {
            if( pow(mouseX - node.inputs[j].center.x, 2) + pow(mouseY - node.inputs[j].center.y, 2) < 25) {
              
              if(node.inputs[j].connection != null) {
                node.inputs[j].connection.destroy();
              }

              let connection = new Connection(currentConnector, node.inputs[j]);

              connection.update();

              connections.push(connection);
              node.inputs[j].connection = connection;
              currentConnector.connections.push(connection);


              break;
            }
          }
        }
      }
    } else {
      for(let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if(
          mouseX > node.x - 5 && mouseX < node.x + node.width + 5 &&
          mouseY > node.y && mouseY < node.y + node.height
        ) {
          for(let j = 0; j < node.outputs.length; j++) {
            if( pow(mouseX - node.outputs[j].center.x, 2) + pow(mouseY - node.outputs[j].center.y, 2) < CONNECTOR_SIZE) {
              
              if(currentConnector.connection != null) {
                currentConnector.connection.destroy();
              }

              let connection = new Connection(node.outputs[j], currentConnector);

              connection.update();

              connections.push(connection);
              node.outputs[j].connections.push(connection);
              currentConnector.connection = connection;

              break;
            }
          }
        }
      }
    }

    currentConnector = null;
  }
}

function keyPressed() {
  if(keyCode == DELETE) {
    if(selected != null) {
      selected.destroy();
    }
  }
}

function toggleMenuOn() {
  if( menuState !== 1) {
    menuState = 1;
    menu.classList.add(active);
  }

  menuPos.x = mouseX;
  menuPos.y = mouseY;
}

function toggleMenuOff() {
  if( menuState !== 0) {
    menuState = 0;
    menu.classList.remove(active);
  }
}

function addListeners() {
  let elements = document.querySelectorAll('a');

  for(let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', (e) => {
      e.preventDefault();
      
      nodes.push(new NodeTypes[e.target.dataset.node](menuPos.x, menuPos.y));
      toggleMenuOff();
    })
  }
}

