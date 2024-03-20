// @ts-check
const {Elf, SmartId} = require('xcraft-core-goblin');
const {string} = require('xcraft-core-stones');
class MapShape {
  id = string;
  name = string;
}

class MapState extends Elf.Sculpt(MapShape) {}

class MapLogic extends Elf.Archetype {
  static db = 'maps';
  state = new MapState({
    id: undefined,
    name: 'new map',
  });

  create(id) {
    this.state.id = id;
  }
}

class Map extends Elf {
  state = new MapState();
  logic = new MapLogic();

  async create(id, desktopId) {
    this.logic.create(id);
    await this.persist();
  }

  async delete() {}
}

module.exports = {Map, MapLogic, MapShape};
