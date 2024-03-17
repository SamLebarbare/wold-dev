const {Elf} = require('xcraft-core-goblin');
const {Wolf, WolfLogic} = require('./lib/wolf.js');

exports.xcraftCommands = Elf.birth(Wolf, WolfLogic);
