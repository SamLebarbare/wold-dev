const {Elf} = require('xcraft-core-goblin');
const WolfCli = require('./lib/wolfCli.js');

exports.xcraftCommands = Elf.birth(WolfCli);
