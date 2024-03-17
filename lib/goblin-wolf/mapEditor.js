const {Elf} = require('xcraft-core-goblin');
const {
  MapEditor,
  MapEditorLogic,
} = require('./lib/widgets/mapEditor/service.js');

exports.xcraftCommands = Elf.birth(MapEditor, MapEditorLogic);
