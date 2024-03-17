// @ts-check
const {Elf, SmartId} = require('xcraft-core-goblin');
const {string} = require('xcraft-core-stones');
const serverConfig = require('xcraft-core-etc')().load('goblin-wolf-server');

class WolfShape {
  id = string;
}

class WolfState extends Elf.Sculpt(WolfShape) {}

class WolfLogic extends Elf.Spirit {
  state = new WolfState({
    id: 'wolf',
  });
}

class Wolf extends Elf.Alone {
  state = new WolfState();

  async boot() {
    this.log.dbg('Boot!');
  }

  async start() {
    this.log.dbg('Start!');
  }
}

module.exports = {Wolf, WolfLogic};
