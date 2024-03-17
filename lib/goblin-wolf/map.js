const {Elf} = require('xcraft-core-goblin');
const {Map, MapLogic} = require('./lib/map.js');

exports.xcraftCommands = Elf.birth(Map, MapLogic);
