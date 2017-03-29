var SerialPort = require('serialport');;

export default function (p5) {
    let comSelect = undefined;
    let conButton = undefined;
    let comPort = undefined;
    
    let parser;

    this.serial = false;

    comSelect = p5.createSelect();
    comSelect.position(p5.width - 105, 5);
    comSelect.size(100, 20);

    conButton = p5.createButton("Connect");
    conButton.position(p5.width - 210, 5);
    conButton.size(100, 20);

    console.log(conButton);

    conButton.mousePressed(() => {
      if(comPort == undefined || conButton.elt.innerText == 'Connect') {

        comPort = new SerialPort(comSelect.value(), {
          baudRate: 9600,
          parser: SerialPort.parsers.readline('\n')
        });

        comPort.on('open', () => {
          this.serial = true;
          conButton.elt.innerText = 'Close';
        });

        comPort.on('close', () => {
          this.serial = false;
          conButton.elt.innerText = 'Connect';
        })

        comPort.on('data', (data) => {
          console.log(data);
        });
      }

      if(conButton.elt.innerText == 'Close') {
        comPort.close();
      }
    });

    this.updatePorts = function() {
      console.log(comSelect.options);
      SerialPort.list((err, ports) => {
      for(let i = 0; i < ports.length; i++) {
        comSelect.option(ports[i].comName);    
      }
    });


    this.updateSerial = function(color) {

      if(comPort != undefined && comPort.isOpen()) {
        comPort.write(`R${color.r}\n`);
        comPort.write(`G${color.g}\n`);
        comPort.write(`B${color.b}\n`);
      }
    }

    this.updateKeyboard = function(color)  {
      //TODO: Update Keyboard using ChromaSDK
    }
  }
};